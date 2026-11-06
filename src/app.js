
import express from 'express'

import apiRoutes from './routes/api.routes.js'
import webRoutes from './routes/web.routes.js'
import { logMiddleware } from './middleware/log.middleware.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(logMiddleware)

app.use('/api', apiRoutes)


app.use('/', webRoutes)

export default app
