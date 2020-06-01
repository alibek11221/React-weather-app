import axios from 'axios';

const url = 'https://aliibbeekk.ru/kladr/api?query=';
export const getSuggestions = async (cityName, signal) => {
    try {
        const {data} = await axios.get(url+cityName, {cancelToken : signal.token});
        const filter = data.result.filter(({id, typeShort})=> id !== "Free" && typeShort === "г");
        return filter.map(x=>{
            return x.parents.length > 0 ?
                `${x.name} ${x.parents[0].name} ${x.parents[0].type}`
                : x.name;
        });
    }catch (e) {
        throw e
    }
}