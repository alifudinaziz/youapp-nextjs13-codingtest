"use client";

import React, { useState, useEffect } from "react";
import { BtnIcon } from "@/components/common/button";
import AboutForm from "@/components/profile/about-form";
import AboutInterestForm from "@/components/profile/interest-form";

interface initFetchGet {
  username: string,
  email: string,
  name: string,
  gender: string,
  birthday: string,
  horoscope: string,
  zodiac: string,
  interest: string[],
  height: number,
  weight: number
}

const ProfilePage = () => {
  const [fetchInitData, setFetchInitData] = useState<initFetchGet | null>(null)

  const handleGetAbout = async () => {
    try {
      const res = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      
      setFetchInitData(data.data)
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    handleGetAbout()
  },[]);

  return (
    <>
      <div className="flex gap-4 justify-between align-middle pr-[10px] pl-2">
        <BtnIcon className="text-white" iconName="chevronLeft" iconPosition="left">
          <span className="font-bold text-sm">Back</span>
        </BtnIcon>
        <p className="text-white font-semibold text-sm">@{fetchInitData?.username}</p>
        <BtnIcon className="text-white" iconName="threeDot" iconPosition="left" />
      </div>
      <div className="mt-[28px] rounded-2xl h-[190px] w-full bg-[#162329] flex items-end px-[13px] py-[16px]">
        <p className="text-white font-bold text-base">@{fetchInitData?.username},</p>
      </div>
      {fetchInitData ? 
        <div className="flex flex-col gap-[18px] mt-6">
          <AboutForm dataFetched={fetchInitData} />
          <AboutInterestForm />
        </div>
      :
        <div className="flex flex-col gap-[18px] mt-6">
          <div className="w-full min-h-[120px] h-full rounded-[14px] bg-white/50 pl-[27px] pt-[13px] pr-[14px] pb-[23px] animate-pulse"></div>
          <div className="w-full min-h-[120px] h-full rounded-[14px] bg-white/50 pl-[27px] pt-[13px] pr-[14px] pb-[23px] animate-pulse"></div>
        </div>
      }
    </>
  )
};

export default ProfilePage;
