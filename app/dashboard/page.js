'use client';
import { useState, useEffect } from 'react';
import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState({});
  const router = useRouter(); 

  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost/api/twitter/getTweets.php');
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load posts');
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPost.trim() !== '') {
        await axios.post('http://localhost/api/twitter/postTweet.php', {
          content: newPost,
          user_id: user.id,
          username: user.username
        });
        setNewPost(''); 
        const response = await axios.get('http://localhost/api/twitter/getTweets.php');
        setPosts(response.data);
      } else {
        setError('Post content cannot be empty');
      }
    } catch (err) {
      setError('Failed to post');
    }
  };

  const handleLike = async (tweetId) => {
    try {
      await axios.post('http://localhost/api/twitter/likeTweet.php', { tweetId });
      const response = await axios.get('http://localhost/api/twitter/getTweets.php');
      setPosts(response.data);
    } catch (err) {
      setError('Failed to like tweet');
    }
  };

  const handleComment = async (tweetId) => {
    try {
        if (newComment[tweetId]?.trim() !== '') {
            await axios.post('http://localhost/api/twitter/commentTweet.php', {
                tweetId,
                comment: newComment[tweetId],
                user_id: user.id, // Send current logged-in user ID
                username: user.username // Send current logged-in username
            });
            const response = await axios.get('http://localhost/api/twitter/getTweets.php');
            setPosts(response.data);
            setNewComment(prev => ({ ...prev, [tweetId]: '' })); 
        } else {
            setError('Comment content cannot be empty');
        }
    } catch (err) {
        setError('Failed to comment on tweet');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
      <n/> <h1>Welcome, {user.username}!</h1>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <Form onSubmit={handlePostSubmit} className="mb-4">
        <Form.Group controlId="formNewPost">
          <Form.Control
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
          />
        </Form.Group>
        <Button type="submit" variant="primary">Post</Button>
      </Form>

      <div>
        <h2>Posted Hugot</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="mb-3">
              <Card.Body>
                <Card.Title>{post.author}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Button variant="primary" className="mr-2" onClick={() => handleLike(post.id)}>Like ({post.likes})</Button>
                <Form onSubmit={(e) => { e.preventDefault(); handleComment(post.id); }} className="mt-2">
                  <Form.Group controlId={`formComment-${post.id}`}>
                    <Form.Control
                      type="text"
                      value={newComment[post.id] || ''}
                      onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                      placeholder="Add a comment..."
                    />
                  </Form.Group>
                  <Button type="submit" variant="secondary" className="mt-2">Comment</Button>
                </Form>
                <div className="mt-3">
                  <h5>Comments:</h5>
                  {post.comments.length > 0 ? (
                    <ListGroup>
                      {post.comments.map((comment, index) => (
                        <ListGroup.Item key={index}>
                          <strong>{comment.username}</strong>: {comment.content}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </Container>
  );
}
