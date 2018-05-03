
export function weather(longitude, latitude) {
    "use strict";

    let url = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=528e73919f4c3ac530bdbffac6754eb8`;
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response)
            .then(result => {
                console.log(result);
            })
            .catch(e => reject(e));
    });
}