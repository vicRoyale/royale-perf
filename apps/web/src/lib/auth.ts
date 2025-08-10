import NextAuth, { type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Email et mot de passe',
      credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Mot de passe', type: 'password' } },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null
        const user = await prisma.user.findUnique({ where: { email: creds.email } })
        if (!user || !user.active) return null
        const ok = await bcrypt.compare(creds.password, user.hash)
        if (!ok) return null
        return { id: user.id, email: user.email, role: user.role, name: `${user.firstName} ${user.lastName}`, teamId: user.teamId }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) { if (user) Object.assign(token, user); return token },
    async session({ session, token }) { (session as any).user = token; return session }
  }
}
