export type BasicWeatherParams = {
    date: {
        epoch: number,
        date: Date
    },
    weather: {
        id: string,
        main: string,
        description: string,
        icon: string
    },
    temperature: {
        max: number,
        min: number,
        current: number,
        sensation: number
    },
    humidity: number,
    pressure: number,
    clouds: number,
    visibility: number,
    wind: {
        speed: number,
        deg: number
    }
}

export type WeatherLocation = {
    place: {
        id: number,
        name: string,
        coord: {
            lon: number,
            lat: number
        }
    }
}

export interface CurrentWeather extends WeatherLocation, BasicWeatherParams {}

export interface FutureWeather extends WeatherLocation{
    forecast: [BasicWeatherParams]
}
