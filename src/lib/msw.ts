import { server } from '@/mocks/server'

export const mswServer = () => {
  if (process.env.NODE_ENV === 'development') {
    server.listen()
  }
}