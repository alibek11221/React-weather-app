import React, {useEffect, useState} from 'react';
import './App.css';
import Searcher from "./components/Searcher/Searcher";
import {getCoords} from "./api/google";
import axios from 'axios';
import Paper from "@material-ui/core/Paper";
import {getWeatherData} from "./api/yandex";
import LinearProgress from "@material-ui/core/LinearProgress";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import ForecastTable from "./components/ForecastTable/ForecastTable";
import Typography from "@material-ui/core/Typography";

const App = () => {
    const [cityName, setCityName] = useState('');
    const [coords, setCoords] = useState({});
    const [gotCoords, setGotCoords] = useState(false);
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const signal = axios.CancelToken.source();
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(false);
        if (cityName.length) {
            setSubmitted(true);
            setLoading(true);
            getCoords(cityName, signal)
                .then(res => {
                    setCoords(res);
                    setGotCoords(true);
                })
                .catch(() => setSubmitted(false));
        }
    }
    useEffect(() => {
        if (!gotCoords) {
            return undefined;
        }
        (async () => {
            try {
                const {lat, lng} = coords;
                const res = await getWeatherData(lat, lng, signal);
                setWeatherData(res);
                setLoading(false);
            } catch (e) {
                setSubmitted(false);
            }
        })();
    }, [coords, gotCoords]);
    return (
        <Paper elevation={3} className={submitted && !loading ? "container" : "container fill"}>
            <div className="inner">
                <Typography style={{marginBottom: "5px", color: "#3f51b5"}} variant="h5">
                    Прогноз погоды своими руками
                </Typography>
                <Searcher handleSubmit={handleSubmit} setCityName={setCityName}/>
                <div>
                    {
                        submitted ?
                            loading ?
                                <LinearProgress style={{marginTop: "30px"}} variant="query"/>
                                :
                                <div style={{marginTop: "30px"}}>
                                    <WeatherCard TodayWeatherData={weatherData.today}/>
                                    <div className="forecastGrid">
                                        {weatherData.forecasts.map(forecast => <ForecastTable
                                            ForecastData={forecast}/>)}
                                    </div>
                                </div>
                            :
                            null
                    }
                </div>
            </div>
        </Paper>
    );
};

export default App;
