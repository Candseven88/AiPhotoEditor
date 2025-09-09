import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { db } from '../db/connection';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const authConfig = {
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAuth = nextUrl.pathname.startsWith('/auth');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isOnAuth) {
        if (isLoggedIn) return Response.redirect(new URL('/dashboard', nextUrl));
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const extendedUser = user as any;
        token.id = user.id;
        token.uuid = extendedUser.uuid || '';
        token.subscription_plan = extendedUser.subscription_plan || 'free';
        token.credits_balance = extendedUser.credits_balance || 10;
        token.email_verified = extendedUser.email_verified || false;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.uuid = token.uuid as string;
        session.user.subscription_plan = token.subscription_plan as string;
        session.user.credits_balance = token.credits_balance as number;
        session.user.email_verified = token.email_verified as boolean;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        // Find user by email
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user) {
          return null;
        }

        // Check if email is verified
        if (!user.email_verified) {
          throw new Error('Please verify your email address before signing in. Check your inbox for a verification link.');
        }

        // Verify password
        if (!user.password_hash) {
          return null;
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
          return null;
        }
        
        return {
          id: user.id.toString(),
          uuid: user.uuid,
          email: user.email,
          name: user.nickname || user.email,
          subscription_plan: user.subscription_plan,
          credits_balance: user.credits_balance,
          email_verified: user.email_verified,
        };
      },
    }),
  ],
} satisfies NextAuthConfig; 