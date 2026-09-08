const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const articles = [
  {
    id: 1,
    title: 'Getting Started with React',
    content: 'React makes it easier to build interactive user interfaces with reusable components.',
  },
  {
    id: 2,
    title: 'Why APIs Matter',
    content: 'APIs allow frontend applications and backend services to communicate reliably.',
  },
  {
    id: 3,
    title: 'Building Better Web Experiences',
    content: 'A thoughtful combination of performance, accessibility, and clear design creates better websites.',
  },
];

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.listen(PORT, () => {
  console.log(`Mock API server running on port ${PORT}`);
});