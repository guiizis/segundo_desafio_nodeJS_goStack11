import express from 'express';
import routes from './routes'


const app = express()
app.use(express.json());
app.use(routes);

const port = 3333
app.listen(port, () => console.log(`the server is running at port ${port}`))

export default app
