import {BasicWeatherParams, CurrentWeather, FutureWeather, WeatherLocation} from "./types";

const extractForecast = (forecast:any): BasicWeatherParams => {
    const date = new Date(0);
    date.setUTCSeconds(forecast.dt);

    return {
        date: {
            epoch: forecast.dt,
            date: date
        },
        weather: {
            id: forecast.weather[0].id,
            main: forecast.weather[0].main,
            description: forecast.weather[0].description,
            icon: forecast.weather[0].icon,
        },
        temperature: {
            max: forecast.main.temp_max,
            min: forecast.main.temp_min,
            current: forecast.main.temp,
            sensation: forecast.main['feels_like']
        },
        humidity: forecast.main.humidity,
        pressure: forecast.main.pressure,
        clouds: forecast.clouds.all,
        visibility: forecast.visibility,
        wind: {
            speed: forecast.wind.speed,
            deg: forecast.wind.deg
        }
    }
}

const extractPlace = (apiResult: any): WeatherLocation => {
    return {
        place: {
            id: apiResult.id,
            name: apiResult.name,
            coord: {
                lon: apiResult.coord.lon,
                lat: apiResult.coord.lat
            }
        }
    };
}
export const parseCurrentApiResponse = (apiResult: any):CurrentWeather => {
    const weather = extractForecast(apiResult);
    const site = extractPlace(apiResult);

    return Object.assign({}, weather, site);
};

export const parseFutureApiResponse = (apiResult: any):FutureWeather => {
    const site = extractPlace(apiResult.city);
    const forecast = apiResult.list.map((item:any) => {
        return extractForecast(item);
    })

    return Object.assign({}, {forecast}, site);
}
