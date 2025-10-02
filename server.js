const http = require('http');

const port = 5000;
const host = 'localhost';

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.statusCode = 200;
  const { method, url } = request;
  if (url === '/') {
    if (method === 'GET') {
      return response.end('Ini adalah homepage');
    } else {
      return response.end(
        `Halaman tidak dapat diakses dengan ${method} request`
      );
    }
  } else if (url === '/about') {
    if (method === 'GET') {
      return response.end('Halo! Ini adalah halaman about');
    }
    if (method === 'POST') {
      let body = [];

      request.on('data', (data) => body.push(data));
      request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`Halo, ${name}! Ini adalah halaman about`);
      });
    } else {
      response.end(`Halaman tidak dapat diakses dengan ${method} request`);
    }
  } else {
    response.end('Halaman tidak dapat ditemukan');
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () =>
  console.log(`server berjalan pada http://${host}:${port}`)
);
