import React from "react";

type Props = {
  dateCardObj: {
    no: number;
    icon: string;
    date: string;
    temp: number;
  };
};

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DateCard: React.FC<Props> = ({ dateCardObj }) => {
  let dt = new Date(dateCardObj.date);
  let day = WEEK_DAYS[dt.getDay()];

  return (
    <div className="p-0.5 hover:p-0 hover:mt-0.5">
      <div className="bg-black m-1 mr-0 hover:bg-blue-500 cursor-pointer text-white p-4 rounded-xl items-center">
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${dateCardObj.icon}@2x.png`}
            alt="icon"
          />
        </div>
        <h2 className="text-lg text-center">{day}</h2>
        <p className="font-bold text-xl text-center">
          {(dateCardObj.temp - 273.15).toFixed(0)}°C
        </p>
      </div>
    </div>
  );
};

export default DateCard;
