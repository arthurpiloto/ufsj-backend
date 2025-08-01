import dotenv = require('dotenv');
import express = require('express');
import mongoose from 'mongoose';
import cors = require('cors');
import authRoutes from './routes/authRoutes';
import pageRoutes from './routes/pageRoutes';

dotenv.config();
const dbUrl = process.env.DATABASE_URL;

const app = express();
app.use(cors());
app.use(express.json());

if (!dbUrl) {
  console.error('Erro: A variável de ambiente DATABASE_URL não está definida.');
  process.exit(1);
}

mongoose
  .connect(dbUrl)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB: ', err));

app.use('/api/auth', authRoutes);
app.use('/api', pageRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server rodando na porta: ${PORT}`);
});
