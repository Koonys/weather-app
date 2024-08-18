import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity, setCurrent, selectedCity}) => {
    return (
        <div>
            <Button variant={selectedCity === '' ? "secondary" : "warning"} onClick={setCurrent}>Current Location</Button>
            {cities.map((item)=>(
                <Button variant={selectedCity === item ? "secondary" : "warning"} onClick={()=>{setCity(item)}}>{item}</Button>
            ))}
        </div>
    );
};

export default WeatherButton;