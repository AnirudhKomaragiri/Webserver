import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <nav>
        <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link> |{' '}
        <Link to="/profile">Profile</Link> |{' '}
        <Link to="/appointment">Appointment</Link>
      </nav>
    </header>
  );
}