import {BasicWeatherParams, CurrentWeather, FutureWeather} from "../OpenWheaterApi/types";
import {InfluxDB} from "influx";

if (!process.env.INFLUX_DSN) {
    throw 'Influx DSN was not provider';
}

const influx = new InfluxDB(process.env.INFLUX_DSN);
const database = process.env.INFLUX_DB;

const generateWeatherPoints = (weather:BasicWeatherParams) => {
    return {
        temp: weather.temperature.current,
        maxTemp: weather.temperature.max,
        minTemp: weather.temperature.min,
        feel: weather.temperature.sensation,
        humidity: weather.humidity,
        pressure: weather.pressure,
        clouds: weather.clouds,
        visibility: weather.visibility,
        windSpeed: weather.wind.speed,
        winDeg: weather.wind.deg,
        text: weather.weather.main,
        longText: weather.weather.description,
        icon: weather.weather.icon
    };
}

export const writeWeather = (weather:CurrentWeather): void => {
    influx.writePoints([
        {
            measurement: 'weather',
            tags: {
                zone: weather.place.name,
                zoneId: weather.place.id.toString(),
            },
            fields: generateWeatherPoints(weather),
            timestamp: weather.date.epoch
        }
    ], {
        database: database,
        precision: 's'
    })
        .then(ok => {

        })
        .catch(error => {
            console.error(error);
        })
}

export const writeForecast = async (forecast:FutureWeather): Promise<void> => {
    //Drop all forecast series
    await influx.dropSeries({measurement: 'forecast', database: database});

    forecast.forecast.forEach(item => {
        influx.writePoints([
            {
                measurement: 'forecast',
                tags: {
                    zone: forecast.place.name,
                    zoneId: forecast.place.id.toString(),
                },
                fields: generateWeatherPoints(item),
                timestamp: item.date.epoch
            }
        ], {
            database: database,
            precision: 's'
        })
            .then(ok => {

            })
            .catch(error => {
                console.error(error);
            })
    });
}
