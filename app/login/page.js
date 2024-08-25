'use client';

import { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13 and later

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/api/twitter/login.php', { email, password });
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/dashboard'); // Updated to use correct route
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred');
    }
  };
  const goToRegister = () => {
    router.push("/register"); // Adjust this to your actual register page path
  };

  return (
    <Card>
      <Container className="d-flex flex-column align-items-center min-vh-100">
      <h1>Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="link" onClick={goToRegister} className="ms-3">Register</Button>
      </Form>
    </Container>
    </Card>
  );
}
