import React from "react";

type Props = {
  detailsObj: {
    feelsLike: number;
    windSpeed: number;
    humidity: number;
    airPressure: number;
  };
};

const DetailsCard: React.FC<Props> = ({detailsObj}) => {
  return (
    <div className="relative bg-black opacity-50 rounded-2xl p-2 text-white">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 justify-between text-md">
          <div className="font-bold">Feels Like</div>
          <div>{(detailsObj.feelsLike-273.15).toFixed(2)} °C</div>
        </div>
        <div className="flex gap-2 justify-between text-md">
          <div className="font-bold">Wind</div>
          <div>{detailsObj.windSpeed} km/h</div>
        </div>
        <div className="flex gap-2 justify-between text-md">
          <div className="font-bold">Humidity</div>
          <div>{detailsObj.humidity} %</div>
        </div>
        <div className="flex gap-2 justify-between text-md">
          <div className="font-bold">Pressure</div>
          <div>{detailsObj.airPressure} hPa</div>
        </div>
      </div>
    </div>
  );
}

export default DetailsCard;
