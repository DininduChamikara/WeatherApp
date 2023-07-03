import React from "react";

type Props = {
  weatherObj: {
    date: string;
    temp: number;
    city: string;
    country: string;
    weatherCondition: string;
    icon: string;
  };
};

const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WeatherCard: React.FC<Props> = ({ weatherObj }) => {
  const day = new Date(weatherObj.date);
  const m = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formatedDate = day.getDate() + " " + m[day.getMonth()] + " " + day.getFullYear();

  let dayString = WEEK_DAYS[day.getDay()];

  return (
    <div className="bg-black text-white p-4 rounded-xl h-full">
      <h2 className="text-2xl font-bold mb-4">{dayString}</h2>
      <div className="flex flex-col space-y-2">
        <p>{formatedDate}</p>
        <p>
          {weatherObj.city} - {weatherObj.country}
        </p>
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`}
            alt="icon"
          />
        </div>

        <p className="font-bold text-6xl">
          {(weatherObj.temp - 273.15).toFixed(1)}°C
        </p>
        <p className="font-bold text-xl">{weatherObj.weatherCondition}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
