const Article = require('../models/Article');
const Comment = require('../models/Comment');

exports.getStatistics = async (req, res) => {
  try {
    const articles = await Article.find();
    const totalComments = await Comment.countDocuments();
    
    const stats = {
      totalArticles: articles.length,
      totalViews: articles.reduce((sum, a) => sum + a.views, 0),
      totalLikes: articles.reduce((sum, a) => sum + a.likes, 0),
      totalComments,
      articleStats: articles.map(a => ({ title: a.title, views: a.views })),
    };
    res.json(stats);
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
};
