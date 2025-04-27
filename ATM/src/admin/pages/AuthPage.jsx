import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required')
});

const registerSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password')
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required')
});

const AuthPage = () => {
  const [authMode, setAuthMode] = useState('login'); // login, register, forgot
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });

  const { 
    register: loginRegister, 
    handleSubmit: handleLoginSubmit, 
    formState: { errors: loginErrors },
    reset: resetLogin
  } = useForm({ resolver: yupResolver(loginSchema) });

  const { 
    register: registerRegister, 
    handleSubmit: handleRegisterSubmit, 
    formState: { errors: registerErrors },
    reset: resetRegister
  } = useForm({ resolver: yupResolver(registerSchema) });

  const { 
    register: forgotRegister, 
    handleSubmit: handleForgotSubmit, 
    formState: { errors: forgotErrors },
    reset: resetForgot
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });


  //API
  const handleLogin = (data) => {
    console.log('Login data:', data);
    setServerMessage({ type: 'success', text: 'Login successful!' });
    resetLogin();
  };

  const handleRegister = (data) => {
    console.log('Registration data:', data);
    setServerMessage({ type: 'success', text: 'Registration successful! Please login.' });
    resetRegister();
    setAuthMode('login');
  };

  const handleForgotPassword = (data) => {
    console.log('Forgot password data:', data);
    setServerMessage({ type: 'success', text: 'Password reset link sent to your email!' });
    resetForgot();
    setAuthMode('login');
  };

  const switchToRegister = () => {
    setAuthMode('register');
    setServerMessage({ type: '', text: '' });
  };

  const switchToLogin = () => {
    setAuthMode('login');
    setServerMessage({ type: '', text: '' });
  };

  const switchToForgotPassword = () => {
    setAuthMode('forgot');
    setServerMessage({ type: '', text: '' });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">
                {authMode === 'login' && 'Login'}
                {authMode === 'register' && 'Register'}
                {authMode === 'forgot' && 'Reset Password'}
              </h2>

              {serverMessage.text && (
                <div className={`alert alert-${serverMessage.type}`}>
                  {serverMessage.text}
                </div>
              )}

              {authMode === 'login' && (
                <form onSubmit={handleLoginSubmit(handleLogin)}>
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">Email address</label>
                    <input
                      type="email"
                      id="loginEmail"
                      className={`form-control ${loginErrors.email ? 'is-invalid' : ''}`}
                      {...loginRegister('email')}
                    />
                    {loginErrors.email && (
                      <div className="invalid-feedback">{loginErrors.email.message}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input
                      type="password"
                      id="loginPassword"
                      className={`form-control ${loginErrors.password ? 'is-invalid' : ''}`}
                      {...loginRegister('password')}
                    />
                    {loginErrors.password && (
                      <div className="invalid-feedback">{loginErrors.password.message}</div>
                    )}
                  </div>

                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>

                  <div className="text-center mb-3">
                    <button 
                      type="button" 
                      className="btn btn-link" 
                      onClick={switchToForgotPassword}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="text-center">
                    Don't have an account?{' '}
                    <button 
                      type="button" 
                      className="btn btn-link p-0" 
                      onClick={switchToRegister}
                    >
                      Register here
                    </button>
                  </div>
                </form>
              )}


              {authMode === 'register' && (
                <form onSubmit={handleRegisterSubmit(handleRegister)}>
                  <div className="mb-3">
                    <label htmlFor="registerName" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="registerName"
                      className={`form-control ${registerErrors.name ? 'is-invalid' : ''}`}
                      {...registerRegister('name')}
                    />
                    {registerErrors.name && (
                      <div className="invalid-feedback">{registerErrors.name.message}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">Email address</label>
                    <input
                      type="email"
                      id="registerEmail"
                      className={`form-control ${registerErrors.email ? 'is-invalid' : ''}`}
                      {...registerRegister('email')}
                    />
                    {registerErrors.email && (
                      <div className="invalid-feedback">{registerErrors.email.message}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">Password</label>
                    <input
                      type="password"
                      id="registerPassword"
                      className={`form-control ${registerErrors.password ? 'is-invalid' : ''}`}
                      {...registerRegister('password')}
                    />
                    {registerErrors.password && (
                      <div className="invalid-feedback">{registerErrors.password.message}</div>
                    )}
                    <div className="form-text">
                      Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="registerConfirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      id="registerConfirmPassword"
                      className={`form-control ${registerErrors.confirmPassword ? 'is-invalid' : ''}`}
                      {...registerRegister('confirmPassword')}
                    />
                    {registerErrors.confirmPassword && (
                      <div className="invalid-feedback">{registerErrors.confirmPassword.message}</div>
                    )}
                  </div>

                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary">Register</button>
                  </div>

                  <div className="text-center">
                    Already have an account?{' '}
                    <button 
                      type="button" 
                      className="btn btn-link p-0" 
                      onClick={switchToLogin}
                    >
                      Login here
                    </button>
                  </div>
                </form>
              )}


              {authMode === 'forgot' && (
                <form onSubmit={handleForgotSubmit(handleForgotPassword)}>
                  <div className="mb-3">
                    <label htmlFor="forgotEmail" className="form-label">Email address</label>
                    <input
                      type="email"
                      id="forgotEmail"
                      className={`form-control ${forgotErrors.email ? 'is-invalid' : ''}`}
                      {...forgotRegister('email')}
                    />
                    {forgotErrors.email && (
                      <div className="invalid-feedback">{forgotErrors.email.message}</div>
                    )}
                    <div className="form-text">
                      We'll send a password reset link to your email.
                    </div>
                  </div>

                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary">Send Reset Link</button>
                  </div>

                  <div className="text-center">
                    Remember your password?{' '}
                    <button 
                      type="button" 
                      className="btn btn-link p-0" 
                      onClick={switchToLogin}
                    >
                      Login here
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;