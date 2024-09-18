// // LoginPage.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import styled from 'styled-components';
// import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const LoginContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #f0f2f5;
// `;

// const LoginForm = styled.form`
//   background-color: white;
//   padding: 2rem;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 400px;
// `;

// const Title = styled.h2`
//   color: #1a73e8;
//   text-align: center;
//   margin-bottom: 2rem;
// `;

// const InputGroup = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   padding: 0.5rem;

//   &:focus-within {
//     border-color: #1a73e8;
//   }
// `;

// const Input = styled.input`
//   flex: 1;
//   border: none;
//   outline: none;
//   padding: 0.5rem;
//   font-size: 1rem;
// `;

// const Icon = styled.span`
//   color: #666;
//   margin-right: 0.5rem;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 0.75rem;
//   background-color: #1a73e8;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   font-size: 1rem;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0d47a1;
//   }

//   &:disabled {
//     background-color: #cccccc;
//     cursor: not-allowed;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 0.8rem;
//   margin-top: 0.25rem;
// `;

// const ToggleButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #666;
// `;

// const Note = styled.p`
//   text-align: center;
//   margin-top: 1rem;
//   font-size: 0.9rem;
//   color: #666;

//   span {
//     color: #1a73e8;
//     cursor: pointer;
//   }
// `;

// const LoginPage = ({ onLogin }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       // Replace with your actual API endpoint
//       const response = await axios.post('/api/login', data);
//       console.log('Login response:', response.data);
//       toast.success('Login successful');
//       onLogin(response.data);
//       navigate('/');
//     } catch (error) {
//       console.error('Login error:', error);
//       toast.error(error.response?.data?.message || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <LoginContainer>
//       <LoginForm onSubmit={handleSubmit(onSubmit)}>
//         <Title>Login</Title>
//         <InputGroup>
//           <Icon><FaEnvelope /></Icon>
//           <Input
//             type="email"
//             placeholder="Email"
//             {...register("email", { 
//               required: "Email is required",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Invalid email address"
//               }
//             })}
//           />
//         </InputGroup>
//         {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
//         <InputGroup>
//           <Icon><FaLock /></Icon>
//           <Input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             {...register("password", { required: "Password is required" })}
//           />
//           <ToggleButton type="button" onClick={() => setShowPassword(!showPassword)}>
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </ToggleButton>
//         </InputGroup>
//         {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
//         <Button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : <><FaSignInAlt /> Login</>}
//         </Button>
//         <Note>
//           Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
//         </Note>
//       </LoginForm>
//     </LoginContainer>
//   );
// };

// export default LoginPage;