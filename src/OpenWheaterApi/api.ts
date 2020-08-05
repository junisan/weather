import {CurrentWeather, FutureWeather} from "./types";
import axios from 'axios';
import {parseCurrentApiResponse} from "./apiParsers";
import {parseFutureApiResponse} from "./apiParsers";

export const fetchCurrentWeather = async (lat: number, long: number): Promise<CurrentWeather> => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.OWA_KEY}&units=metric`;
    try{
        const result = await axios.get(url);
        return parseCurrentApiResponse(result.data);
    }catch (e) {
        throw e;
    }
};

export const fetchFutureWeather = async (lat: number, long: number): Promise<FutureWeather> => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${process.env.OWA_KEY}&units=metric`;
    try{
        const result = await axios.get(url);
        return parseFutureApiResponse(result.data);
    } catch(e) {
      throw e;
    }
}

