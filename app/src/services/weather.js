import axios from "axios";

const API_KEY = "12635b2b543b1f57824aaab60c39e392";


export async function getWeather(latitude, longitude) {

    const response = await axios.get(

        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`

    );

    return response.data;

}