"use client";

import React, { useState } from "react";
import { BtnSubmit } from "@/components/common/button";
import { InputText, InputPassword } from "@/components/common/input";
import { useRouter } from "next/navigation";

function isEmail(text: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
}

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isPasswordProvided = !!password;
  const isEmailOrUsernameProvided = !!email || !!username;
  const isDisabled = !isPasswordProvided || !isEmailOrUsernameProvided;

  const resetForm = () => {
    setEmail('');
    setUsername('');
    setPassword('');
  }

  const handleUsernameOrEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (isEmail(inputValue)) {
      setEmail(inputValue);
      setUsername('');
    } else {
      setUsername(inputValue);
      setEmail('');
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'email': email,
          'username': username,
          'password': password
        })
      });
      const data = await res.json();
      alert(data.message);
      
      if (data.access_token) {
        router.push('/profile');
      }
    } catch (error) {
      alert('Ada gangguan server. Coba lagi');
    } finally {
      resetForm();
    }
  }

  return (
    <>
      <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
        <InputText placeholder="Enter Username/Email" id="usernameInput" type="text" required
          className="input-auth-primary px-[18px] pt-[17px] pb-[18px] w-full rounded-[9px]"
          value={email ? email : username} onChange={handleUsernameOrEmail}
        />
        <InputPassword placeholder="Enter Password" id="passwordInput" required
          className="input-auth-primary px-[18px] pt-[17px] pb-[18px] w-full rounded-[9px]"
          value={password} onChange={(e) => setPassword(e.target.value.trim())}
        />
        <BtnSubmit className="mt-[10px] after:rounded-lg" type="submit" disabled={isDisabled}>
          <p className="text-white font-bold text-base leading-[1.25]">Login</p>
        </BtnSubmit>
      </form>
    </>
  )
};

export default LoginForm;
