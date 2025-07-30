import { Request, Response } from 'express';
import User from '../models/User';
import jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).send({ message: 'Usuário registado com sucesso!' });
  } catch (error: any) {
    res.status(400).send({ error: 'Erro ao registar usuário.', details: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Credenciais inválidas.' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('O segredo JWT não está definido.');
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '8h' });
    res.status(200).send({ access_token: token });
  } catch (error: any) {
    res
      .status(500)
      .send({ error: 'Erro no servidor ao tentar fazer login.', details: error.message });
  }
};
