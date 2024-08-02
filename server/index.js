import express, { json } from 'express'
import cors from 'cors'
import router from './router/api_router.js'
const app = express()

app.use(json())
app.use(cors())
app.disable('x-powered-by')

app.use('/products', router)

const port = process.env.PORT ?? 2000
app.listen(port, () => console.log(`Server running on port http://localhost:${port}/products`))