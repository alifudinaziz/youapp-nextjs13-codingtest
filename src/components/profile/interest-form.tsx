"use client";

import React from "react"
import { BtnIcon } from "@/components/common/button";

const InterestForm = () => {
  return (
    <div className="w-full min-h-[120px] h-full rounded-[14px] bg-[#0E191F] pl-[27px] pt-[13px] pr-[14px] pb-[23px]">
      <div className="flex justify-between align-middle">
        <p className="text-white text-sm font-bold leading-none">Interest</p>
        <BtnIcon className="text-white" iconName="pencilEdit" iconPosition="left" />
      </div>
      <p className="text-white/50 text-sm font-medium">Add in your interest to find a better match</p>
    </div>
  )
};

export default InterestForm;
