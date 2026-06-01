import express from 'express'
import { userRouter } from './router/user.router'
import { authRouter } from './router/auth.router'
import { postRouter } from './router/post.entity'
import { swaggerRouter } from './infra/swagger/swagger.router'
import { errorHandler } from './infra/middlewares/error-handler.middleware'

export const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/api', swaggerRouter)

app.use(errorHandler)
