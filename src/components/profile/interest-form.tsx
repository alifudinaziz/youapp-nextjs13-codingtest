"use client";

import React from "react"
import { BtnIcon } from "@/components/common/button";
import { Dialog } from "@radix-ui/themes";

const AboutInterestForm = () => {
  return (
    <div className="w-full min-h-[120px] h-full rounded-[14px] bg-[#0E191F] pl-[27px] pt-[13px] pr-[14px] pb-[23px]">
      <div className="flex justify-between align-middle">
        <p className="text-white text-sm font-bold leading-none">Interest</p>
        <Dialog.Root>
          <Dialog.Trigger>
            <BtnIcon className="text-white" iconName="pencilEdit" iconPosition="left" />
          </Dialog.Trigger>
          <Dialog.Content className="modal-full-page bg-primary-gradient px-4 pt-9">
            <div className="flex justify-between align-middle">
              <Dialog.Close>
                <BtnIcon className="text-white" iconName="chevronLeft" iconPosition="left">
                  <span className="font-bold text-sm">Back</span>
                </BtnIcon>
              </Dialog.Close>
              <Dialog.Close>
                <button className="btn-blue-gradient text-sm font-semibold leading-none">
                  Save
                </button>
              </Dialog.Close>
            </div>
            <div className="mt-[73px]">
              <p className="gold-gradient text-sm font-bold ml-[11px]">Tell everyone about yourself</p>
              <p className="text-white text-xl font-bold ml-[11px] mt-3">What interest you?</p>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
      <p className="text-white/50 text-sm font-medium mt-[28px]">Add in your interest to find a better match</p>
    </div>
  )
};

export default AboutInterestForm;
