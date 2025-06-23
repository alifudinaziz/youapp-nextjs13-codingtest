import React from "react";
import { BtnIcon } from "@/components/common/button";
import RegisterForm from "@/components/auth/register-form";
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className="min-h-svh h-full bg-primary-gradient px-4 pt-9 block pb-9">
      <BtnIcon className="text-white" iconName="chevronLeft" iconPosition="left">
        <span className="font-bold text-sm">Back</span>
      </BtnIcon>
      <h1 className="text-white font-bold text-2xl ml-6 mt-[60px]">Register</h1>
      <div className="px-2 mt-[25px]">
        <RegisterForm />
      </div>
      <div className="flex justify-center mt-[52px] gap-1">
        <p className="text-white font-medium text-[13px]">Have an account?</p>
        <Link className="font-medium text-[13px]" href="/login">
          <span className="gold-gradient underline-gold-gradient">Login here</span>
        </Link>
      </div>
    </div>
  )
};

export default RegisterPage;
