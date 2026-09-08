import { useEffect, useState } from 'react';
import { getArticles } from '../../services/articleService.jsx';

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
    <main>
      <h1>Blogs</h1>
      {isLoading && <p>Loading articles...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && articles.map((article) => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </article>
      ))}
    </main>
  );
}

export default BlogsPage;