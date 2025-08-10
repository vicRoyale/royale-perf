import { describe, it, expect } from 'vitest'
import { z } from 'zod'
const login = z.object({ email: z.string().email(), password: z.string().min(6) })

describe('Zod validations', () => {
  it('rejects invalid email', () => {
    expect(() => login.parse({ email:'x', password:'123456'})).toThrow()
  })
})
