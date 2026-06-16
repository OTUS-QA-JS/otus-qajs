import { faker } from '@faker-js/faker'
import { UserCredentials } from '../models'

export function generateUserCredentials(): UserCredentials {
  return {
    userName: faker.internet.email(),
    password: 'P@ssw0rd'
  }
}
