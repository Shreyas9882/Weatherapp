import React from 'react'

const search = async () => {
    const element=document.getElementsByClassName("city-input")
    if (element[0].value==="")
    {
        return 0;
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_keys}`;
    let response= await fetch(url);
    let data=await response.json();
    const humidity=document.getElementsByClassName("humidity-percent");
    const wind=document.getElementsByClassName("wind-speed");
    const temperature=document.getElementsByClassName("weather-temp");
    const location=document.getElementsByClassName("weather-location");

    humidity[0].innerHTML= data.main.humidity;
    wind[0].innerHTML= data.wind,speed;
    temperature[0].innerHTML=data.main.temp;
    location[0].innerHTML=data.name;
  return (
    <div>
        
    </div>
  )
}

export default search