import { useEffect, useState } from 'react';
import { getArticles } from '../../services/articleService.jsx';
import '../../styles/BlogsPage.css';

function BlogsPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Unable to load articles:', error);
        setError('Unable to load articles. Make sure the Express server is running on port 5000.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="page-card blogs-page">
      <div className="page-heading-row">
        <div className="page-intro">
          <p className="eyebrow">Blog library</p>
          <h1>Latest articles</h1>
          <p>Read practical notes, reflections, and lessons from the development journey.</p>
        </div>
        {!isLoading && !error && <strong className="article-count">{articles.length} articles</strong>}
      </div>

      {isLoading && <p>Loading articles...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && (
        <div className="article-grid">
          {articles.map((article) => (
            <article className="article-card" key={article._id || article.id}>
              {article.category && <p className="article-category">{article.category}</p>}
              <h2>{article.title}</h2>
              <p>{article.content}</p>
              {article.author && <p className="article-author">By {article.author}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default BlogsPage;