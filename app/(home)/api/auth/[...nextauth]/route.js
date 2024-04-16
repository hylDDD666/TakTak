import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authenticate } from '@/app/action/action'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userName: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== 'undefined') {
          const user = await authenticate(
            credentials.userName,
            credentials.password
          )
          if (typeof user !== 'undefined') {
            // console.log(user);
            return user
          } else {
            return null
          }
        } else {
          return null
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  jwt: {
    secret: 'test',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token, user }) {
      if (session?.user && token) {
        session.accessToken = token.accessToken
        session.user.id = token.id
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
