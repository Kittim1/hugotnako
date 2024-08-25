'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { Container, Button, Card } from 'react-bootstrap';

function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = localStorage.getItem('user');

      if (user) {
        try {
          // If user is logged in, parse the JSON and redirect to dashboard
          const parsedUser = JSON.parse(user);
          router.push('/dashboard');
        } catch (error) {
          console.error("Failed to parse user data:", error);
          // Handle the case where user data is corrupted
          localStorage.removeItem('user'); // Clear the corrupted data
        }
      } else {
        // If user is not logged in, show a button to log in or register
      }
    };

    checkAuth();
  }, [router]);

  return (

      <Container className="mt-5 text-center">
        <h1>Welcome to Twitter Clone</h1>
        <p>Please log in to continue or register if you don't have an account.</p>
        <Button href="/login" variant="primary" className="mr-2">
          Login
        </Button>
        <Button href="/register" variant="secondary">
          Register
        </Button>
      </Container>
  );
}

export default Home;
