const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Article = require('./models/Article');
const Comment = require('./models/Comment');
const Profile = require('./models/Profile');
require('dotenv').config();

const blogsData = [
  {
    title: 'Building Better Habits for Learning Code',
    author: 'Jared L. Noel',
    date: 'August 18, 2026',
    category: 'Learning',
    excerpt: 'A few small routines can make study sessions calmer, more consistent, and more rewarding.',
    content: 'Learning to code becomes more manageable when the work is broken into small, repeatable habits. Set aside a regular time to practice, write down questions as they arise, and build tiny projects that let you apply one new concept at a time.',
    views: 128,
    likes: 34,
    comments: [
      { author: 'Mia Santos', text: 'The idea of tiny projects helped me make my study sessions less stressful.' },
      { author: 'Noah Cruz', text: 'Writing questions down while coding is such a practical habit.' },
    ],
  },
  {
    title: 'What I Learned From My First React Project',
    author: 'Jared L. Noel',
    date: 'August 22, 2026',
    category: 'React',
    excerpt: 'Components, state, and patience: the three things that turned a blank screen into a working app.',
    content: 'My first React project taught me that a user interface is easier to manage when it is divided into focused components. State made the page responsive to user actions, while props made it possible to share data clearly between components.',
    views: 214,
    likes: 57,
    comments: [
      { author: 'Ela Dela Cruz', text: 'This explains props and state in a way that feels beginner-friendly.' },
      { author: 'Ken Ramos', text: 'I had the same realization when I started breaking pages into components.' },
      { author: 'Aira Lim', text: 'The patience part is underrated but very real.' },
    ],
  },
  {
    title: 'Why Sharing Your Work Matters',
    author: 'Jared L. Noel',
    date: 'August 28, 2026',
    category: 'Community',
    excerpt: 'Publishing progress invites feedback and creates a useful record of how far you have come.',
    content: 'Sharing unfinished work can feel uncomfortable, but it creates opportunities for feedback and connection. A simple post about a small win or a difficult bug can help another learner and document your own progress.',
    views: 176,
    likes: 42,
    comments: [
      { author: 'Sam Rivera', text: 'This convinced me to start posting weekly progress notes.' },
      { author: 'Lia Mercado', text: 'Feedback really does make learning feel less isolated.' },
    ],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await User.deleteMany({});
    await Article.deleteMany({});
    await Comment.deleteMany({});
    await Profile.deleteMany({});

    // Create User
    const hashedPassword = await bcrypt.hash('reactblog2026', 10);
    const user = await User.create({ username: 'jared', password: hashedPassword });

    // Create Profile
    await Profile.create({
      userId: user._id,
      name: 'Jared Noel',
      program: 'BS Computer Science',
      email: 'jared.noel@example.com',
      contactNumber: '+63 912 345 6789',
    });

    // Create Articles and Comments
    for (const blogData of blogsData) {
      const { comments, ...articleData } = blogData;
      const article = await Article.create(articleData);
      
      for (const commentData of comments) {
        await Comment.create({
          articleId: article._id,
          author: commentData.author,
          text: commentData.text,
        });
      }
    }

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
