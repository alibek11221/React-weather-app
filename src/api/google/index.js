import axios from 'axios';

export const getCoords = async (cityName, signal) => {
    const url = `https://aliibbeekk.ru/google/api?cityName=${cityName}`;
    try{
        const {data : {results}} = await axios.get(url, {cancelToken:signal.token})
        const {lng, lat} = results[0].geometry.location;
        console.log(lng, lat);
        return {lng, lat};
    }catch (e) {
        throw e;
    }
}