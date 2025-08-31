import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    uuid: string
    subscription_plan: string
    credits_balance: number
    email_verified: boolean
  }

  interface Session {
    user: {
      id: string
      uuid: string
      email: string
      name: string
      subscription_plan: string
      credits_balance: number
      email_verified: boolean
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uuid: string
    subscription_plan: string
    credits_balance: number
    email_verified: boolean
  }
} 