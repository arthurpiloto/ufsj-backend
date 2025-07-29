import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import pageRoutes from './routes/pageRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('Erro: A variável de ambiente DATABASE_URL não está definida.');
  process.exit(1);
}

mongoose
  .connect(dbUrl)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/api/auth', authRoutes);
app.use('/api', pageRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});
