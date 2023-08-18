const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 8008;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  const urls = Array.isArray(url) ? url : [url];

  const responseData = [];

  try {
    for (const apiUrl of urls) {
      const response = await axios.get(apiUrl);
      responseData.push(response.data);
    }

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from URLs' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(PORT, () => {
  const host = 'localhost';
  const port = server.address().port;
  console.log(`Server is running at http://${host}:${port}`);
});
