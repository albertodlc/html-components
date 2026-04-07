const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 7777;

// Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/region-options', (req, res) => {
  const jsonData = JSON.stringify([
    { key: 1, value: 'Norte' },
    { key: 2, value: 'Sur' },
    { key: 3, value: 'Este' },
    { key: 4, value: 'Oeste' },
  ]);

  res.send(jsonData);
});

app.get('/zone-options', (req, res) => {
  const jsonData = JSON.stringify([
    { key: 1, value: 'Bizkaia' },
    { key: 2, value: 'Gipuzkoa' },
    { key: 3, value: 'Navarra' },
    { key: 4, value: 'Etc' },
  ]);

  res.send(jsonData);
});

app.get('/area-options', (req, res) => {
  const jsonData = JSON.stringify([
    { key: 1, value: 'Area 2' },
    { key: 2, value: 'Area Emergencia' },
    { key: 3, value: 'Area Pamplona' },
    { key: 4, value: 'Etc' },
  ]);

  res.send(jsonData);
});

app.get('/table', (req, res) => {
  res.send({
    data: [
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 17, name: 'Peter', test: 'Prueba' },
      { id: 16, name: 'Peter', test: 'Prueba' },
      { id: 12, name: 'Peter', test: 'Prueba' },
      { id: 10, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 2, name: 'Peter', test: 'Prueba' },
      { id: 3, name: 'Peter', test: 'Prueba' },
      { id: 4, name: 'Peter', test: 'Prueba' },
      { id: 5, name: 'Peter', test: 'Prueba' },
      { id: 6, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
      { id: 1, name: 'Peter', test: 'Prueba' },
    ],
    columns: [
      { title: 'Id', field: 'id' },
      { title: 'Name', field: 'name' },
      { title: 'Test', field: 'test' },
    ],
    pagination: {
      totalPages: 2000,
      lastRow: 1000,
    },
    tableOrder: {
      sorter: [],
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
