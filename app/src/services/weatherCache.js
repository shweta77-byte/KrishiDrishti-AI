import { Storage } from "./storage";

const WEATHER_KEY = "weather_cache";

export const WeatherCache = {

    save(weather) {

        Storage.save(WEATHER_KEY, {

            weather,

            updatedAt: Date.now()

        });

    },

    load() {

        return Storage.load(WEATHER_KEY);

    }

};