import { Role } from '@prisma/client'
export const can = {
  manageUsers: (role?: string) => role === 'ADMIN',
  manageGoals: (role?: string) => role === 'ADMIN' || role === 'MANAGER',
  readTeam: (role?: string) => role === 'ADMIN' || role === 'MANAGER',
  readOwn: () => true,
}
export const routeForRole = (role?: string) => role === 'ADMIN' ? '/dashboard/admin' : role === 'MANAGER' ? '/dashboard/manager' : '/dashboard/agent'
