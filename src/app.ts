import express from 'express'
import router from './routes/routes.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())
app.use(router)

app.listen(3000);