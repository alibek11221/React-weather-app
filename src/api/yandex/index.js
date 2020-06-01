import axios from 'axios';

export const getWeatherData = async (lat, lon, signal)=>{
    const url = `https://aliibbeekk.ru/weather?lat=${lat}&lon=${lon}`;
    try{
        const {data} = await axios.get(url, {cancelToken: signal.token});
        const {fact, forecasts} = data;
        const {temp, wind_speed, icon, humidity} = fact;
        return {forecasts:forecasts, today:{temp:temp, wind:wind_speed, icon:icon, humidity:humidity}};
    }catch (e) {
        throw e;
    }
}