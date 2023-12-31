/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const router = useRouter();
  const signMeOut = () => {
    signOut();
    router.push('/');
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="title my-0">BookMarked</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto subtitle">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/library">
              <Nav.Link>Library</Nav.Link>
            </Link>
            <Link passHref href="/library/new">
              <Nav.Link>Add A Book</Nav.Link>
            </Link>
            <Link passHref href="/users">
              <Nav.Link>Users</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>My Profile</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signMeOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
