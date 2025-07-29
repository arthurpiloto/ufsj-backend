import { Request, Response } from 'express';
import Page from '../models/Page';

export const createPage = async (req: Request, res: Response) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.status(201).send(page);
  } catch (error: any) {
    res.status(400).send({ error: 'Erro ao criar a página.', details: error.message });
  }
};

export const getAllPagesForCms = async (req: Request, res: Response) => {
  try {
    const pages = await Page.find({}, 'title slug _id');
    res.status(200).send(pages);
  } catch (error: any) {
    res.status(500).send({ error: 'Erro ao buscar as páginas.', details: error.message });
  }
};

export const getPageById = async (req: Request, res: Response) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).send({ message: 'Página não encontrada.' });
    }
    res.status(200).send(page);
  } catch (error: any) {
    res.status(500).send({ error: 'Erro ao buscar a página.', details: error.message });
  }
};

export const getPageBySlug = async (req: Request, res: Response) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) {
      return res.status(404).send({ message: 'Página não encontrada.' });
    }
    res.status(200).send(page);
  } catch (error: any) {
    res.status(500).send({ error: 'Erro ao buscar a página.', details: error.message });
  }
};

export const updatePage = async (req: Request, res: Response) => {
  try {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!page) {
      return res.status(404).send({ message: 'Página não encontrada.' });
    }
    res.status(200).send(page);
  } catch (error: any) {
    res.status(400).send({ error: 'Erro ao atualizar a página.', details: error.message });
  }
};

export const deletePage = async (req: Request, res: Response) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).send({ message: 'Página não encontrada.' });
    }
    res.status(200).send({ deleted: true, id: req.params.id });
  } catch (error: any) {
    res.status(500).send({ error: 'Erro ao apagar a página.', details: error.message });
  }
};
