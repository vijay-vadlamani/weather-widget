/**
 * @module src/app
 */

/**
 * @namespace Services.geolocation
 * @class geolocation
 */

/**
 * Very simple geolocation method based on https://freegeoip.net free geoip service
 * (may not be the most accurate nor the most fast or available, but it's only to have some xhr in the code example).
 *
 * Example:
 *
 * ```
 * geolocation()
 *   .then((result) => {
 *     console.log(result);//there you are
 *   })
 *   .catch(e => {
 *     console.error(e);
 *   });
 * ```
 *
 * @method geolocation
 * @param {String} [ipAddress] You can pass a specific IP address to geoloc if you want.
 * @return {Promise}
 */
export function geolocation(locationAddress) {
    "use strict";
    let key = `AIzaSyDwC3xgZS0m2liMI5gRcT70FhZcoXUrHI4`;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationAddress}&sensor=true&key=${key}`;
    return new Promise((resolve, reject) => {
        fetch(url).then((response) => response.json()).then((locationResponse) => {
          resolve(locationResponse);
          var locationData = {
                latitude : locationResponse.results[0].geometry.location.lat,
                longitude : locationResponse.results[0].geometry.location.lng,
              };

        }).catch(err => {
          reject(err);
      })
      })
}