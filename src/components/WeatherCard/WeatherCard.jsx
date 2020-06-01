import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import {FiDroplet, FiWind} from 'react-icons/fi';
import List from "@material-ui/core/List";
import styles from './WeatherCard.module.css';

const WeatherCard = ({TodayWeatherData}) => {

    return (
        <List className={styles.block} key={TodayWeatherData.temp}>
            <ListItem className={styles.item}>
                <ListItemAvatar className={styles.ava}>
                    <img src={`https://yastatic.net/weather/i/icons/blueye/color/svg/${TodayWeatherData.icon}.svg`}
                         alt={TodayWeatherData.temp}/>
                </ListItemAvatar>
                <ListItemText>Сейчас на улице <span
                    className={styles.text}>{TodayWeatherData.temp}</span>&deg;C</ListItemText>
            </ListItem>
            <ListItem className={styles.item}>
                <ListItemAvatar className={styles.ava}>
                    <FiWind/>
                </ListItemAvatar>
                <ListItemText>Скорость ветра <span
                    className={styles.text}>{TodayWeatherData.wind}</span> м/с</ListItemText>
            </ListItem>
            <ListItem className={styles.item}>
                <ListItemAvatar className={styles.ava}>
                    <FiDroplet/>
                </ListItemAvatar>
                <ListItemText>Влажность воздуха <span
                    className={styles.text}>{TodayWeatherData.humidity}</span>%</ListItemText>
            </ListItem>
        </List>
    );
};

export default WeatherCard;