const fs = require('fs/promises');
const path = require('path');
const ejs = require('ejs');
const axios = require('axios');

const API_URL = 'http://localhost:3001';

async function buildPage(slug) {
  try {
    console.log(`Iniciando build para a página: ${slug}`);
    const response = await axios.get(`${API_URL}/pages/${slug}`);
    const pageData = response.data;

    const templatePath = path.join(__dirname, `../templates/editais.ejs`);
    const template = await fs.readFile(templatePath, 'utf-8');

    const html = ejs.render(template, { page: pageData });

    const outputPath = path.join(__dirname, `../dist/sisu/2025/editais.html`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, html);

    console.log(`Página salva com sucesso em: ${outputPath}`);
  } catch (error) {
    console.error(`Falha no build da página ${slug}:`, error.message);
    process.exit(1);
  }
}

const slug = process.argv[2];
if (!slug) {
  console.error('Erro: Slug da página não fornecido.');
  process.exit(1);
}
buildPage(slug);
