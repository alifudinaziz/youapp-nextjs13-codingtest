import React from "react"

type DataProps = {
  data: {
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

const ProfileAbout = ({data}: DataProps) => {
  const normalizeDate = (date: string | null) => {
    const today = new Date();

    if (date) {
      const changeDate = new Date(date)
      const year = changeDate.getFullYear();
      const month = changeDate.getMonth() + 1;
      const dates = changeDate.getDate();

      let age = today.getFullYear() - year;
      const hasHadBirthdayThisYear = today.getMonth() > changeDate.getMonth() ||
        (today.getMonth() === changeDate.getMonth() && today.getDate() >= changeDate.getDate());

        if (!hasHadBirthdayThisYear) {
          age--;
        }

      return `${dates}/${month}/${year} (Age ${age})`;
    }
  };
  
  return (
    <div className="flex flex-col gap-[15px] mt-6">
      <div className="flex gap-1">
        <p className="text-white/30 font-medium text-[13px]">Birthday</p>
        <p className="text-white font-medium text-[13px]">{normalizeDate(data ? data.birthday : null)}</p>
      </div>
      <div className="flex gap-1">
        <p className="text-white/30 font-medium text-[13px]">Horoscope</p>
        <p className="text-white font-medium text-[13px]">{data?.horoscope}</p>
      </div>
      <div className="flex gap-1">
        <p className="text-white/30 font-medium text-[13px]">Zodiac</p>
        <p className="text-white font-medium text-[13px]">{data?.zodiac}</p>
      </div>
      <div className="flex gap-1">
        <p className="text-white/30 font-medium text-[13px]">Height</p>
        <p className="text-white font-medium text-[13px]">{data?.height}</p>
      </div>
      <div className="flex gap-1">
        <p className="text-white/30 font-medium text-[13px]">Weight</p>
        <p className="text-white font-medium text-[13px]">{data?.weight}</p>
      </div>
    </div>
  )
};

export default ProfileAbout;
