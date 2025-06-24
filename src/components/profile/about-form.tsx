"use client";

import React, { useState, useRef, useEffect } from "react";
import { BtnIcon } from "@/components/common/button";
import { InputText } from "@/components/common/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "@radix-ui/themes";
import ProfileAbout from "./profile-about";

const zodiacSigns = [
  { sign: 'Capricorn', start: '01-01', end: '01-19' },
  { sign: 'Aquarius', start: '01-20', end: '02-18' },
  { sign: 'Pisces', start: '02-19', end: '03-20' },
  { sign: 'Aries', start: '03-21', end: '04-19' },
  { sign: 'Taurus', start: '04-20', end: '05-20' },
  { sign: 'Gemini', start: '05-21', end: '06-20' },
  { sign: 'Cancer', start: '06-21', end: '07-22' },
  { sign: 'Leo', start: '07-23', end: '08-22' },
  { sign: 'Virgo', start: '08-23', end: '09-22' },
  { sign: 'Libra', start: '09-23', end: '10-22' },
  { sign: 'Scorpio', start: '10-23', end: '11-21' },
  { sign: 'Sagittarius', start: '11-22', end: '12-21' },
  { sign: 'Capricorn', start: '12-22', end: '12-31' },
];
const chineseZodiacs = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig',
];

function getWesternZodiac(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formatted = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const found = zodiacSigns.find(z => {
    return formatted >= z.start && formatted <= z.end;
  });

  return found ? found.sign : 'Unknown';
}
function getChineseZodiac(date: Date) {
  const year = date.getFullYear();
  const baseYear = 2020;
  const index = (year - baseYear + 12) % 12;
  return chineseZodiacs[index];
}

type FetchedDataProps = {
  dataFetched: {
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
  } | null;
};

const AboutForm = ({dataFetched}: FetchedDataProps) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [horoscope, setHoroscope] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditAbout = () => {
    setShowForm(true);
  }
  const normalizeDate = (date: Date | null) => {
    const year = date?.getFullYear();
    const month = date ? date.getMonth() + 1 : null;
    const dates = date?.getDate();
    if (date !== null) {
      return `${dates}/${month}/${year}`;
    }
  };
  const handleDateChange = (date: Date | null) => {
    const cleanDate = normalizeDate(date);
    setBirthday(date);

    if (date) {
      setHoroscope(getWesternZodiac(date));
      setZodiac(getChineseZodiac(date));
    } else {
      setHoroscope('');
      setZodiac('');
    }
  };
  const handleSaveAbout = async () => {
    // const arrayDataInterest = ['code', 'volley'];

    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'name': name,
          'gender': gender,
          'birthday': birthday,
          'horoscope': horoscope,
          'zodiac': zodiac,
          'height': Number(height),
          'weight': Number(weight),
          // 'interests': arrayDataInterest
        })
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      alert(error);
    } finally {
      resetInput();
      setShowForm(false);
    }
  }
  const resetInput = () => {
    setName('');
    setGender('');
    setBirthday(null);
    setHoroscope('');
    setZodiac('');
    setHeight('');
    setWeight('');
  }

  const triggerInputImage = () => {
    inputImgRef.current?.click();
  }
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const passFetchedData = () => {
    if (dataFetched) {
      if (dataFetched.hasOwnProperty("name") && dataFetched.hasOwnProperty("birthday") && dataFetched.hasOwnProperty("horoscope") && dataFetched.hasOwnProperty("zodiac") && dataFetched.hasOwnProperty("height") && dataFetched.hasOwnProperty("weight")) {
        setName(dataFetched.name)
        setBirthday(new Date(dataFetched.birthday))
        setZodiac(dataFetched.zodiac)
        setHoroscope(dataFetched.horoscope)
        setHeight((dataFetched.height).toString())
        setWeight((dataFetched.height).toString())
      } else {
        resetInput();
      }
    }
  }

  useEffect(() => {
    passFetchedData()
  }, [])

  return (
    <div className="w-full min-h-[120px] h-full rounded-[14px] bg-[#0E191F] pl-[27px] pt-[13px] pr-[14px] pb-[23px]">
      <div className="flex justify-between align-middle">
        <p className="text-white text-sm font-bold leading-none">About</p>
        {!showForm ?
          <BtnIcon className="text-white" iconName="pencilEdit" iconPosition="left" onClick={handleEditAbout} /> :
          <p className="gold-gradient text-xs font-medium" onClick={handleSaveAbout}>
            Save & Update
          </p>
        }
      </div>
      {!showForm ?
        <>
          {(!name || !birthday || !horoscope || !zodiac || !height || !weight) ?
            <p className="text-white/50 text-sm font-medium mt-[33px] leading-none">
              Add in your your to help others know you better
            </p>
          :
            <ProfileAbout data={dataFetched} />
          }
        </>
      :
        <div>
          <div className="mt-[31px]">
            <div className="flex gap-[15px] items-center">
              <div className="w-[57px] h-[57px] flex flex-col items-center justify-center bg-white/10 rounded-[17px]">
                <BtnIcon className="text-white" iconName="plus" iconClassName="size-6" color="#F3EDA6" iconPosition="left" onClick={triggerInputImage} />
                <input type="file" name="inputImage" id="inputImage" accept="image/*"
                  ref={inputImgRef} onChange={handleUploadImage} className="hidden"
                />
              </div>
              <p className="text-white text-xs font-medium">Add image</p>
            </div>
          </div>
          <div className="mt-[29px] flex flex-col gap-3">
            <div className="flex gap-6 items-center justify-between">
              <p className="text-white/30 text-[13px] font-medium leading-none w-full basis-1/3">Display Name</p>
              <InputText placeholder="Enter name" id="name" type="text" containerClassName="flex grow"
                className="input-about-primary px-5 py-2.5 w-full rounded-lg placeholder:text-white/30 placeholder:text-[13px] placeholder:font-medium"
                value={name} onChange={(e) => setName(e.target.value.trim())}
              />
            </div>
            <div className="flex gap-6 items-center justify-between">
              <p className="text-white/30 text-[13px] font-medium leading-none w-full basis-1/3">Gender</p>
              <div className="flex grow">
                <input type="hidden" name="gender" id="hiddenGenderInput" value={gender} />
                <Select.Root value={gender} onValueChange={setGender}>
                  <Select.Trigger placeholder="Select Gender" />
                  <Select.Content>
                    <Select.Item value="male">Male</Select.Item>
                    <Select.Item value="female">Female</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
            <div className="flex gap-6 items-center justify-between">
              <p className="text-white/30 text-[13px] font-medium leading-none w-full basis-1/3">Birthday</p>
              <div className="flex grow">
                <DatePicker
                  className="flex-1 text-white input-about-primary px-5 py-2.5 w-full rounded-lg placeholder:text-white/30 placeholder:text-[13px] placeholder:font-medium"
                  placeholderText="DD MM YYYY"
                  dateFormat="dd/MM/yyyy"
                  selected={birthday} onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="flex gap-6 items-center justify-between">
              <p className="text-white/30 text-[13px] font-medium leading-none w-full basis-1/3">Horoscope</p>
              <InputText placeholder="--" id="horoscope" type="text" containerClassName="flex grow" disabled
                className="input-about-primary px-5 py-2.5 w-full rounded-lg placeholder:text-white/30 placeholder:text-[13px] placeholder:font-medium"
                value={horoscope}
              />
            </div>
            <div className="flex gap-6 items-center justify-between">
              <p className="text-white/30 text-[13px] font-medium leading-none w-full basis-1/3">Zodiac</p>
              <InputText placeholder="--" id="zodiac" type="text" containerClassName="flex grow" disabled
                className="input-about-primary px-5 py-2.5 w-full rounded-lg placeholder:text-white/30 placeholder:text-[13px] placeholder:font-medium"
                value={zodiac}
              />
            </div>
            <div className="flex gap-6 items-center justify-between">
              <p className="text-white/30 text-[13px] font-medium leading-none w-full basis-1/3">Height</p>
              <InputText placeholder="Add height" id="height" type="number" containerClassName="flex grow"
                className="input-about-primary px-5 py-2.5 w-full rounded-lg placeholder:text-white/30 placeholder:text-[13px] placeholder:font-medium"
                value={height} onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="flex gap-6 items-center justify-between">
              <p className="text-white/30 text-[13px] font-medium leading-none w-full basis-1/3">Weight</p>
              <InputText placeholder="Add weight" id="weight" type="number" containerClassName="flex grow"
                className="input-about-primary px-5 py-2.5 w-full rounded-lg placeholder:text-white/30 placeholder:text-[13px] placeholder:font-medium"
                value={weight} onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
        </div>
      }
    </div>
  )
};

export default AboutForm;
