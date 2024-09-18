// // SignupPage.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import styled from 'styled-components';
// import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaEye, FaEyeSlash, FaPhone } from 'react-icons/fa';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const SignupContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   background-color: #f0f2f5;
//   padding: 2rem 0;
// `;

// const SignupForm = styled.form`
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

// const SignupPage = ({ onSignup }) => {
//   const { register, handleSubmit, formState: { errors }, watch } = useForm();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       if (isOtpSent) {
//         // Verify OTP
//         const response = await axios.post('/api/verify-otp', {
//           email: data.email,
//           otp: data.otp
//         });
//         console.log('OTP verification response:', response.data);
//         toast.success('Signup successful');
//         onSignup(response.data);
//         navigate('/');
//       } else {
//         // Send OTP
//         const response = await axios.post('/api/send-otp', {
//           email: data.email
//         });
//         console.log('OTP sent response:', response.data);
//         setIsOtpSent(true);
//         toast.success('OTP sent successfully');
//       }
//     } catch (error) {
//       console.error('Signup error:', error);
//       toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SignupContainer>
//       <SignupForm onSubmit={handleSubmit(onSubmit)}>
//         <Title>{isOtpSent ? 'Verify OTP' : 'Sign Up'}</Title>
//         {!isOtpSent && (
//           <>
//             <InputGroup>
//               <Icon><FaUser /></Icon>
//               <Input
//                 type="text"
//                 placeholder="Username"
//                 {...register("username", { required: "Username is required" })}
//               />
//             </InputGroup>
//             {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
//           </>
//         )}
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
//         {!isOtpSent && (
//           <>
//             <InputGroup>
//               <Icon><FaPhone /></Icon>
//               <Input
//                 type="tel"
//                 placeholder="Mobile Number"
//                 {...register("mobile", { 
//                   required: "Mobile number is required",
//                   pattern: {
//                     value: /^[0-9]{10}$/,
//                     message: "Invalid mobile number"
//                   }
//                 })}
//               />
//             </InputGroup>
//             {errors.mobile && <ErrorMessage>{errors.mobile.message}</ErrorMessage>}
//             <InputGroup>
//               <Icon><FaLock /></Icon>
//               <Input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 {...register("password", { 
//                   required: "Password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters long"
//                   },
//                   pattern: {
//                     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                     message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
//                   }
//                 })}
//               />
//               <ToggleButton type="button" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </ToggleButton>
//             </InputGroup>
//             {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
//             <InputGroup>
//               <Icon><FaLock /></Icon>
//               <Input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 {...register("confirmPassword", {
//                   validate: (val) => {
//                     if (watch('password') != val) {
//                       return "Your passwords do not match";
//                     }
//                   },
//                 })}
//               />
//               <ToggleButton type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </ToggleButton>
//             </InputGroup>
//             {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
//           </>
//         )}
//         {isOtpSent && (
//           <InputGroup>
//             <Icon><FaLock /></Icon>
//             <Input
//               type="text"
//               placeholder="Enter OTP"
//               {...register("otp", { required: "OTP is required" })}
//             />
//           </InputGroup>
//         )}
//         {errors.otp && <ErrorMessage>{errors.otp.message}</ErrorMessage>}
//         <Button type="submit" >
//           {loading ? 'Processing...' : (isOtpSent ? 'Verify OTP' : <><FaUserPlus /> Sign Up</>)}
//         </Button>
//         <Note>
//           Already have an account? <span onClick={() => navigate('/login')}>Login</span>
//         </Note>
//       </SignupForm>
//     </SignupContainer>
//   );
// };

// export default SignupPage;