import React, { useState } from 'react';
const api={
    key: "8973851e27e1c828bee698b8ece5d5f6",
    base: "https://api.openweathermap.org/data/2.5/"

}
const dateBuilder=(d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     let day=days[d.getDay()];
     let date=d.getDate();
     let month=months[d.getMonth()];
     let year=d.getFullYear();
     return `${day} ${date} ${month} ${year}`
   
}



function App(){ 
    const [query, setQuery]=useState('')
    const [weather, setWeather]=useState({})

    const search=evt=>{
        if(evt.key==="Enter"){
            console.log("lalal")
           fetch(`${api.base}weather?q=${query}&APPID=${api.key}`)
        //    fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c120ee11339337726921529efc75c60a`) 
           .then(res=>res.json())
            .then(result=>{
                setQuery('');
                setWeather(result);
                console.log(result)
            });
        }
        }
    return(
    <div className={(typeof weather.main!="undefined")?(weather.main.temp>18+273?'app warm':'app'):'app'}> 
        <main> 
        <div className="search-box ">
           <input type="text" className="search-bar" placeholder="Search..."
           onChange={e=>(setQuery(e.target.value))}
           value={query}
           onKeyPress={search}
           >
           </input>
           </div>
           {(typeof weather.main !="undefined")?(
               <div>
                   <div className="location-box">
               <div className="location">{weather.name},{weather.sys.country}</div>
               <div className="date">{dateBuilder(new Date())}</div>
               
           </div>

           <div className="weather-box">
           <div className="temp"> {Math.round(weather.main.temp)-273}°C</div>
           <div className="weather">{weather.weather[0].main}</div>
           </div>
               </div>

           ):('')}
        </main>
    </div>
)
}

export default App;