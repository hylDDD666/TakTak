import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authenticate, getUserInfoById } from '@/app/action/action'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'

export const { auth, handlers, signIn, signOut } = NextAuth({
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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
      }
      if (trigger === 'update') {
        // const res = await getUserInfoById(user.id)
        token.name = session.name
      }

      return token
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.accessToken = token.accessToken
        session.user.id = token.id
        session.user.name = token.name
      }
      // console.log('session:', session)
      return session
    },
  },
})
