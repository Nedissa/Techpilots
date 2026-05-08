import { loadEnv, defineConfig } from '@medusajs/framework/utils'
import path from 'path'

// In monorepo, ensure we're loading env from backend directory
const backendDir = __dirname
loadEnv(process.env.NODE_ENV || 'development', backendDir)

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL || "sqlite:./db.sqlite",
    http: {
      storeCors: process.env.STORE_CORS || "*",
      adminCors: process.env.ADMIN_CORS || "*",
      authCors: process.env.AUTH_CORS || "*",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    disable: process.env.NODE_ENV === 'production'
  }
})
