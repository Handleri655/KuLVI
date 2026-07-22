import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import type { UserRole } from '../lib/database.types'

type Props = {
  children: React.ReactNode
  /** Jos annettu, käyttäjällä pitää olla yksi näistä rooleista */
  roles?: UserRole[]
}

export default function RequireAuth({ children, roles }: Props) {
  const { ready, user, role, configured } = useAuth()
  const location = useLocation()

  if (!ready) {
    return (
      <div className="auth-loading">
        <p>Ladataan…</p>
      </div>
    )
  }

  if (!configured) {
    return (
      <Navigate to="/kirjaudu" replace state={{ from: location.pathname, setup: true }} />
    )
  }

  if (!user) {
    return <Navigate to="/kirjaudu" replace state={{ from: location.pathname }} />
  }

  if (roles && (!role || !roles.includes(role))) {
    return <Navigate to="/jasensivu" replace />
  }

  return children
}
