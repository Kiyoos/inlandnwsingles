import express from 'express';
const app = express();
import { initDb } from './db/connect.js';
import cors from 'cors';
import router from './routes/index.js';
import 'dotenv/config';

const port = process.env.PORT || 3000;

// export default async function server() {
app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  initDb();
  console.log(`Connected to DB and listening on ${port}`);
});
// }
