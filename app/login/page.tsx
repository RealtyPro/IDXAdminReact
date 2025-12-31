'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/services/auth/AuthService';
interface loginResponse {
  email: string;
  password: string;
}
export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const loginMutation = useMutation({
    mutationFn: (user: loginResponse) => login(user),

    onSuccess: (data) => {
      console.log("authenticated successfully:", data.access_token);
      sessionStorage.setItem('token', data.access_token);

      window.location.href = "/admin/blog";

    },
    onError: (error) => {
      console.error("Error  while login:", error);
    },
  });
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle login logic here
      loginMutation.mutate(formData);

      // /   / const response =await login(formData);
      //     if (response.status === 200) {
      //       console.log('Login successful',response.data);
      //     }
      console.log('Form submitted:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <main className="min-h-screen bg-white flex">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-8">
              <Image src="/images/logo.svg" alt="CallXing Logo" width={40} height={40} />
              <span className="font-serif text-heading text-dark">callXing</span>
            </Link>
            <h2 className="font-serif text-heading text-dark">Welcome back</h2>
            <p className="mt-2 text-body text-dark-secondary">
              Please enter your details to sign in
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark">
                Email address 
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-border'
                  } px-4 py-3 text-dark shadow-sm focus:border-primary focus:outline-none`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-border'
                  } px-4 py-3 text-dark shadow-sm focus:border-primary focus:outline-none`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-dark">
                  Remember me
                </label>
              </div>

              <Link href="/forgot-password" className="text-sm text-primary hover:text-primary-light">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-[37.5px] bg-gradient-to-br from-primary to-primary-light text-white font-bold text-button hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-dark-secondary">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary hover:text-primary-light">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light opacity-90"></div>
        <Image
          src="/images/hero-image.png"
          alt="Login"
          fill
          className="object-cover"
          priority
        />
      </div>
    </main>
  );
} 