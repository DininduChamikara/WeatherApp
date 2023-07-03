import { useEffect, useRef, useState } from "react";
import apiManager from "../api/apiManager";
import DateCard from "../components/DateCard";
import DetailsCard from "../components/DetailsCard";
import SeeMoreBtn from "../components/SeeMoreBtn";
import WeatherCard from "../components/WeatherCard";
import backgroundImage from "../images/weather_bg.jpg";

type WeatherRecord = {
  no: number;
  dateTime: string;
  temp: number;
  weatherCondition: string;
  icon: string;
  feelsLike: number;
  windSpeed: number;
  humidity: number;
  airPressure: number;
};

function Home() {
  const [expanded, setExpanded] = useState(false);

  const [todayWetherRecordId, setTodayWetherRecordId] = useState("");

  const [dateWeatherInfo, setDateWeatherInfo] = useState({
    date: "",
    temp: 0,
    city: "",
    country: "",
    weatherCondition: "",
    icon: "",
  });

  const [weatherDetails, setWeatherDetails] = useState({
    feelsLike: 0,
    windSpeed: 0,
    humidity: 0,
    airPressure: 0,
  });

  const [forecastedWetherInfo, setForecastedWeatherInfo] = useState<
    WeatherRecord[]
  >([]);

  const formRef = useRef(null);
  const [form, setForm] = useState({
    latitude: "",
    longitude: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let today = new Date().toISOString();

    const apiCall = apiManager.apiGET_CurrentWeather(
      form.latitude,
      form.longitude
    );
    apiCall.then((res) => {
      if (res) {
        if (res.cod === 200) {
          setDateWeatherInfo({
            date: today,
            temp: res.main.temp,
            city: res.name,
            country: res.sys.country,
            weatherCondition: res.weather[0].main,
            icon: res.weather[0].icon,
          });
          setWeatherDetails({
            feelsLike: res.main.feels_like,
            windSpeed: res.wind.speed,
            humidity: res.main.humidity,
            airPressure: res.main.pressure,
          });
          setTodayWetherRecordId(res.id);
        }
      }
    });
  };

  useEffect(() => {
    const apiCall = apiManager.apiGET_CurrentWeather("6.927079", "79.861244");
    let today = new Date().toISOString();
    apiCall.then((res) => {
      if (res) {
        if (res.cod === 200) {
          setDateWeatherInfo({
            date: today,
            temp: res.main.temp,
            city: res.name,
            country: res.sys.country,
            weatherCondition: res.weather[0].main,
            icon: res.weather[0].icon,
          });
          setWeatherDetails({
            feelsLike: res.main.feels_like,
            windSpeed: res.wind.speed,
            humidity: res.main.humidity,
            airPressure: res.main.pressure,
          });
          setTodayWetherRecordId(res.id);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (todayWetherRecordId !== "") {
      const weekWetherArr: WeatherRecord[] = [];
      const apiCall = apiManager.apiGET_ForecastedWeather(todayWetherRecordId);

      apiCall.then((res) => {
        if (res.cod === "200") {
          let list = res.list;
          for (let index = 0; index < list.length; index = index + 8) {
            const element = list[index];
            weekWetherArr.push({
              no: index / 8,
              dateTime: element.dt_txt,
              temp: element.main.temp,
              weatherCondition: element.weather[0].main,
              icon: element.weather[0].icon,
              feelsLike: element.main.feels_like,
              windSpeed: element.wind.speed,
              humidity: element.main.humidity,
              airPressure: element.main.pressure,
            });
          }
          setForecastedWeatherInfo(weekWetherArr);
        }
      });
    }
  }, [todayWetherRecordId]);

  return (
    <div
      className="relative w-full h-screen mx-auto flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="border-2 border-gray-300 p-2 rounded-2xl w-2/3">
        <div className="bg-gray-500 opacity-80 rounded-2xl mb-2">
          <div className="px-6 py-4">
            <div className="font-bold text-5xl mb-2 text-blue-900">
              Weather Forecast App
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-1/4">
            <WeatherCard weatherObj={dateWeatherInfo} />
          </div>
          <div className="w-3/4">
            <div>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="flex gap-2">
                  <div className="w-4/5">
                    <div className="grid gap-2 mb-2 md:grid-cols-2">
                      <div>
                        <input
                          type="text"
                          name="latitude"
                          value={form.latitude}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter latitude"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="longitude"
                          value={form.longitude}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter longitude"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/5">
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="relative bg-gray-500 opacity-50 rounded-2xl mb-2">
              <div className="relative z-10 opacity-100 flex">
                {forecastedWetherInfo.map((item, index) => {
                  if (expanded) {
                    return (
                      <div
                        onClick={() => {
                          setDateWeatherInfo({
                            ...dateWeatherInfo,
                            date: item.dateTime,
                            temp: item.temp,
                            weatherCondition: item.weatherCondition,
                            icon: item.icon,
                          });
                          setWeatherDetails({
                            ...weatherDetails,
                            feelsLike: item.feelsLike,
                            windSpeed: item.windSpeed,
                            humidity: item.humidity,
                            airPressure: item.airPressure,
                          })
                        }}
                      >
                        <DateCard
                          dateCardObj={{
                            no: index,
                            icon: item.icon,
                            date: item.dateTime,
                            temp: item.temp,
                          }}
                        />
                      </div>
                    );
                  } else {
                    if (index < 3) {
                      return (
                        <div
                          onClick={() => {
                            setDateWeatherInfo({
                              ...dateWeatherInfo,
                              date: item.dateTime,
                              temp: item.temp,
                              weatherCondition: item.weatherCondition,
                              icon: item.icon,
                            });
                            setWeatherDetails({
                              ...weatherDetails,
                              feelsLike: item.feelsLike,
                              windSpeed: item.windSpeed,
                              humidity: item.humidity,
                              airPressure: item.airPressure,
                            })
                          }}
                        >
                          <DateCard
                            dateCardObj={{
                              no: index,
                              icon: item.icon,
                              date: item.dateTime,
                              temp: item.temp,
                            }}
                          />
                        </div>
                      );
                    }
                  }
                })}
                <div
                  className="w-full m-2 ml-1"
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                >
                  <SeeMoreBtn expanded={expanded} />
                </div>
              </div>
            </div>
            <DetailsCard detailsObj={weatherDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
