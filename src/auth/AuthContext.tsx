import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { UserRole } from '../lib/database.types'

type AuthState = {
  ready: boolean
  session: Session | null
  user: User | null
  role: UserRole | null
  fullName: string | null
  configured: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  isBoard: boolean
  isMember: boolean
}

const AuthContext = createContext<AuthState | null>(null)

async function fetchProfile(userId: string) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    console.error('Profiilin haku epäonnistui:', error.message)
    return null
  }
  return data as { role: UserRole; full_name: string | null } | null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)
  const [fullName, setFullName] = useState<string | null>(null)

  const loadProfile = useCallback(async (user: User | null) => {
    if (!user) {
      setRole(null)
      setFullName(null)
      return
    }
    const profile = await fetchProfile(user.id)
    setRole((profile?.role as UserRole | undefined) ?? null)
    setFullName(profile?.full_name ?? user.email ?? null)
  }, [])

  useEffect(() => {
    if (!supabase) {
      setReady(true)
      return
    }

    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      void loadProfile(data.session?.user ?? null).finally(() => {
        if (mounted) setReady(true)
      })
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      void loadProfile(next?.user ?? null)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [loadProfile])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      return {
        error:
          'Supabase ei ole vielä määritetty. Lisää VITE_SUPABASE_URL ja VITE_SUPABASE_ANON_KEY tiedostoon .env',
      }
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }, [])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setRole(null)
    setFullName(null)
  }, [])

  const value = useMemo<AuthState>(
    () => ({
      ready,
      session,
      user: session?.user ?? null,
      role,
      fullName,
      configured: isSupabaseConfigured,
      signIn,
      signOut,
      isBoard: role === 'hallitus',
      isMember: role === 'jasen' || role === 'hallitus',
    }),
    [ready, session, role, fullName, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
