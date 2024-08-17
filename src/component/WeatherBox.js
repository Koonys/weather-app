import React from 'react';

const WeatherBox = ({weather}) => {
    return (
        <div className={"weather-box"}>
            <div>{weather?.name}</div>
            <h2>{weather?.main.temp}&#176;&#67; / {Math.round((weather?.main.temp*1.8+32)*100)/100}&#176;&#70;</h2>
            <h3>{weather?.weather[0].description}</h3>
        </div>
    );
};

export default WeatherBox;