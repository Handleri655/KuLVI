export type UserRole = 'jasen' | 'hallitus'

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: UserRole
          full_name: string | null
          created_at: string
        }
        Insert: {
          id: string
          role: UserRole
          full_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          role?: UserRole
          full_name?: string | null
          created_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          title: string
          description: string | null
          audience: 'jasen' | 'hallitus'
          storage_path: string | null
          published_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          audience: 'jasen' | 'hallitus'
          storage_path?: string | null
          published_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          audience?: 'jasen' | 'hallitus'
          storage_path?: string | null
          published_at?: string
        }
      }
    }
  }
}
