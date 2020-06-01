import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import {FiDroplet, FiWind} from "react-icons/fi";
import {ConvertDate} from '../../helpers';
import Typography from "@material-ui/core/Typography";
import styles from './ForecastTable.module.css';

const ForecastTable = ({ForecastData}) => {
    const {date, parts} = ForecastData;
    const {day} = parts;
    return (
        <List className={styles.block} key={date}
              subheader={<Typography className={styles.header}>{ConvertDate(date)}</Typography>}>
            <ListItem className={styles.item}>
                <ListItemAvatar className={styles.ava}>
                    <img src={`https://yastatic.net/weather/i/icons/blueye/color/svg/${day.icon}.svg`} alt={day.temp}/>
                </ListItemAvatar>
                <ListItemText>Погода на улице <span className={styles.text}>{day.temp_avg}</span>&deg;C</ListItemText>
            </ListItem>
            <ListItem className={styles.item}>
                <ListItemAvatar className={styles.ava}>
                    <FiWind/>
                </ListItemAvatar>
                <ListItemText>Скорость ветра <span className={styles.text}>{day.wind_speed}</span> м/с</ListItemText>
            </ListItem>
            <ListItem className={styles.item}>
                <ListItemAvatar className={styles.ava}>
                    <FiDroplet/>
                </ListItemAvatar>
                <ListItemText>Влажность воздуха <span className={styles.text}>{day.humidity}</span>%</ListItemText>
            </ListItem>
        </List>
    );
};

export default ForecastTable;