import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authenticate } from '@/app/action/action'
import Login from '@/app/ui/Login'
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userName: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          if (typeof credentials !== 'undefined') {
            const res = await authenticate(credentials.userName, credentials.password)
            if (typeof res !== 'undefined') {
              return { ...res.user, apiToken: res.token }
            } else {
              return null
            }
          } else {
            return null
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  ],
  session: { strategy: 'jwt' }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
