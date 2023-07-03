class ApiService {
  async apiGET_CurrentWeather(lat: string, lon: string) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async apiGET_ForecastedWeather(id: string) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async apiGET_Icon(icon: string) {
    try {
      const response = await fetch(
        `https://openweathermap.org/img/wn/${icon}@2x.png`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiService();
