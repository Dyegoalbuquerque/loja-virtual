const producao = false;

export const environment = {
  producao: producao,
  urlRoot: producao ? 'https://dev.sitemercado.com.br' : 'http://localhost:3000',
  urlSufixo: producao ? '/api' : '',
};

