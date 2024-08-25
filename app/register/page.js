'use client';
import { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      const url = "http://localhost/api/twitter/register.php";
      const res = await axios.post(url, { username, email, password });
      const response = res.data;

      if (response.success) {
        setSuccess("Registration successful!");
        setError(''); // Clear any previous error messages
        router.push("/"); // Redirect to login after successful registration
      } else {
        setError(response.message || "Failed to register");
        setSuccess(''); // Clear any previous success messages
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      setSuccess(''); // Clear any previous success messages
    }
  };

  const goToLogin = () => {
    router.push("/");
  }

  return (
    <Container className="d-flex flex-column align-items-center min-vh-100">
      <Card className="p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h1>Register</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <br />
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
          <br />
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
          <br />
          <Button variant="primary" type="submit">
            Register
          </Button>
          <Button variant="link" onClick={goToLogin} className="ms-3">Back to Login</Button>
        </Form>
      </Card>
    </Container>
  );
}
