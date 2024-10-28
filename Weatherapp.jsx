import React, { useState, useEffect } from 'react';
import './Weatherapp.css';
import clear from "./Assets/clear.png";
import cloud from "./Assets/cloud.png";
import drizzle from "./Assets/drizzle.png";
import rain from "./Assets/rain.png";
import snow from "./Assets/snow.png";
import cloudy_background from "./Assets/cloudy_background.jpg";
import drizzling_background from "./Assets/drizzling_background.jpg";
import raining_background from "./Assets/raining_background.jpg";
import snowing_background from "./Assets/snowing_background.jpg";
import sunny_background from "./Assets/sunny_background.jpg";

const Weatherapp = () => {
    let api_key = "b5ec2c6197bbe6c4c16843f7f144ec80";
    const [Weather, SetWeather] = useState(cloud);
    const [Background, SetBackground] = useState(cloudy_background);

    const handleSearch = async () => {
        try {
            const element = document.getElementsByClassName("city-input");
            if (element[0].value === "") {
                return;
            }

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
            let response = await fetch(url);

            if (!response.ok) {
                throw new Error('City not found');
            }

            let data = await response.json();
            const humidity = document.getElementsByClassName("humidity-percent");
            const wind = document.getElementsByClassName("wind-speed");
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");

            humidity[0].innerHTML = data.main.humidity + "%";
            wind[0].innerHTML = data.wind.speed + "km/hr";
            temperature[0].innerHTML = data.main.temp + "`C";
            location[0].innerHTML = data.name;

            if (data.weather && data.weather[0].icon) {
                if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
                    SetWeather(clear);
                    SetBackground(sunny_background);
                } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                    SetWeather(cloud);
                    SetBackground(cloudy_background);
                } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
                    SetWeather(drizzle);
                    SetBackground(drizzling_background);
                } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
                    SetWeather(rain);
                    SetBackground(raining_background);
                } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
                    SetWeather(rain);
                    SetBackground(raining_background);
                } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
                    SetWeather(snow);
                    SetBackground(snowing_background);
                } else {
                    SetWeather(clear);
                    SetBackground(sunny_background);
                }
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    // Use effect to dynamically change the body's background image when Background state changes
    useEffect(() => {
        if (Background) {
            document.body.style.backgroundImage = `url(${Background})`;
            document.body.style.backgroundSize = 'cover';  // Ensures the background image covers the whole screen
            document.body.style.backgroundRepeat = 'no-repeat'; // Prevent background image repetition
            document.body.style.backgroundPosition = 'center'; // Centers the background image
        }
    }, [Background]); // This runs whenever `Background` state changes

    return (
        <div className='container'>
            <div className='header'>
                <h2>WELCOME TO WEATHER APP</h2>
            </div>

            <div className='Search-bar'>
                <input type='text' className='city-input' placeholder='Search'/>
            </div>
            <div className='Search-logo' onClick={handleSearch}>
                <img src='search.png' alt='Search-logo'/>
            </div>

            <div className='Weather-Image'>
                <img src={Weather} alt="Weather Icon"/>
            </div>

            <div className='Weather-Contents'>
                <div className='weather-temp'>24C</div>
                <div className='weather-location'>London</div>
            </div>
            <div className='Data-Content'>
                <div className='element'>
                    <img src='humidity.png' alt='icon'/>
                    <div className='data'>
                        <div className='humidity-percent'>64%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>

                <div className='element'>
                    <img src='wind.png' alt='icon'/>
                    <div className='data'>
                        <div className='wind-speed'>18km/hr<br/></div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weatherapp;
