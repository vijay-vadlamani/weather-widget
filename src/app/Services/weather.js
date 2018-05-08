
export function weather(longitude, latitude) {
    "use strict";
    // http://dataservice.accuweather.com/locations/v1/cities/geoposition/search
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=528e73919f4c3ac530bdbffac6754eb8`;
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(result => {
                return resolve(result.main);
            })
            .catch(e => reject(e));
    });
}