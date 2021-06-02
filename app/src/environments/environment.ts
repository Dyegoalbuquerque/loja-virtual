const producao = true;

export const environment = {
  producao: producao,
  urlRoot: producao ? 'http://localhost:5000' : 'http://localhost:3000',
  urlSufixo: producao ? '/api' : '',
};

