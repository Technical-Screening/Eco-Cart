import app from './app'
import serverless from 'serverless-http'

export const ecocart = serverless(app);