import express from 'express'
import userRoutes from './routes/userRouter'
import { authentication } from './middlewares/authMiddleWare'

const app = express()

app.use(express.json())
app.use(authentication)

//routes
app.use('/api', userRoutes)

export default app;