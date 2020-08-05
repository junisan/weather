require('dotenv').config();

import {fetchCurrentWeather, fetchFutureWeather} from "./OpenWheaterApi/api";
import {writeWeather, writeForecast} from "./Influx/influx";


const lat = 40.578408
const lon = -3.891256

function updateForecast() {
    fetchCurrentWeather(lat, lon).then(a => writeWeather(a));
    fetchFutureWeather(lat, lon).then(b => writeForecast(b));
}

const tenMinutes = 1000 * 60 * 10;

setInterval(() => {
    console.log((new Date()) + 'Running Scheduled Update');
    updateForecast();
}, tenMinutes);

console.log((new Date()) + 'Running First-Run Update');
updateForecast();
