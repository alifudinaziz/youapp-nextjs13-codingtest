"use client";

import React, { useState } from "react";
import { BtnSubmit } from "@/components/common/button";
import { InputText, InputPassword } from "@/components/common/input";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isDisabled = !email || !username || !password || !confirmPassword;
  
  const resetForm = () => {
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (password === confirmPassword) {
      try {
        const res = await fetch('/api/register', {
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
      } catch (error) {
        alert('Ada gangguan server. Coba lagi');
      } finally {
        resetForm();
        router.push('/login');
      }
    } else {
      alert('Cek Password Anda');
    }
  }

  return (
    <>
      <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
        <InputText placeholder="Enter Email" id="emailInput" type="email" required
          className="input-auth-primary px-[18px] pt-[17px] pb-[18px] w-full rounded-[9px]"
          value={email} onChange={(e) => setEmail(e.target.value.trim())}
        />
        <InputText placeholder="Create Username" id="usernameInput" type="text" required
          className="input-auth-primary px-[18px] pt-[17px] pb-[18px] w-full rounded-[9px]"
          value={username} onChange={(e) => setUsername(e.target.value.trim())}
        />
        <InputPassword placeholder="Create Password" id="passwordInput" required
          className="input-auth-primary px-[18px] pt-[17px] pb-[18px] w-full rounded-[9px]"
          value={password} onChange={(e) => setPassword(e.target.value.trim())}
        />
        <InputPassword placeholder="Confirm Password" id="confirmPasswordInput" required
          className="input-auth-primary px-[18px] pt-[17px] pb-[18px] w-full rounded-[9px]"
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value.trim())}
        />
        <BtnSubmit className="mt-[10px] after:rounded-lg" type="submit" disabled={isDisabled}>
          <p className="text-white font-bold text-base leading-[1.25]">Login</p>
        </BtnSubmit>
      </form>
    </>
  )
};

export default RegisterForm;
