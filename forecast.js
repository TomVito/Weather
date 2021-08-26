const request=require('postman-request');

const forecast=(place, callback)=>{
    const url='https://api.meteo.lt/v1/places/'+place+'/forecasts/long-term';

    request({url:url}, (error, response)=>{
    const data=response.body;
    const weather=JSON.parse(data);
    console.log(weather.place.name);
    let fc=[];
    weather.forecastTimestamps.forEach((d)=>{
        fc.push({
            date: d.forecastTimeUtc,
            temperature: d.airTemperature,
        });
    });
    callback(fc,weather.place.name);
    });
}

const places=(callback)=>{
    const url='https://api.meteo.lt/v1/places';

    request({url:url}, (error, response)=>{
        const data=response.body;
        const places=JSON.parse(data);
        const pl=[];
        places.forEach((d)=>{
            pl.push({
                code: d.code,
                name: d.name
            });
        });
        callback(pl);
    });
}

module.exports={forecast, places};