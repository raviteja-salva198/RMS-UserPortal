import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const SignupForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: #1a73e8;
  text-align: center;
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;

  &:focus-within {
    border-color: #1a73e8;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Icon = styled.span`
  color: #666;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0d47a1;
  }
`;

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup:', { username, email, password });
    onSignup();
    navigate('/');
  };

  return (
    <SignupContainer>
      <SignupForm onSubmit={handleSignup}>
        <Title>Sign Up</Title>
        <InputGroup>
          <Icon><FaUser /></Icon>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Icon><FaEnvelope /></Icon>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Icon><FaLock /></Icon>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>
        <Button type="submit">
          <FaUserPlus /> Sign Up
        </Button>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;