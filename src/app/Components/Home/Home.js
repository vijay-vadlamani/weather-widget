/**
 * @module src/app
 */
import MotherComponent from '../MotherComponent/MotherComponent.js';

import template from './Home.html!text';
import stylesheet from './Home.css!';

import {geolocation} from '../../Services/geolocation.js';
import {weather} from '../../Services/weather';

export default class Home extends MotherComponent {
    /**
     * ```
     * @namespace Components.Home.Home
     * @class Home
     * @extends Components.MotherComponent.MotherComponent
     * @constructor
     * @param {HTMLElement|String} domNode Can be an domNode or a domNode id
     */
    constructor(domNode) {
        super(domNode, template);
    }
    
    getUserPosition(options) {
        if (navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            })
        }
    }

    latAndLngData() {
        this.getUserPosition()
        .then((position) => {
            var latitude = position.coords.latitude,
                longitude = position.coords.longitude;
        })
        .catch((err) => {
            console.error(err.message);
        });
    }

    getWeatherInfo(longitude, latitude) {
        let geolocationInfo = this.domNode.querySelector('.location')
        weather(longitude, latitude).then((result) => {
            let tempInKelvin = result.temp;
            console.log("result",result);
            let currentTemp = 1.8*(tempInKelvin - 273) + 32;
            let currentLocalTemp = Math.round(currentTemp * 10) / 10;
            let tpl = `
                Current Temperature : ${currentLocalTemp}
            `;
            geolocationInfo.style.display = "block";
            geolocationInfo.innerHTML = tpl;
        });
    }
    /**
     * Inits the Home component, adding all its specific logic.
     * @method init
     * @chainable
     * @return {Components.Home.Home}
     */
    init() {
        let geolocationInfo = this.domNode.querySelector('.location');

        this.domNode.querySelector('.showLocation').addEventListener('click', () => {
            let locationName = document.getElementsByTagName("input")[0].value;
            if(locationName == "") {
                this.getUserPosition().then((res)=> {
                    console.log(res);
                    let latitude = res.coords.latitude,
                        longitude = res.coords.longitude;
                        this.getWeatherInfo(longitude, latitude);
                })
            } else {
                let locationName = document.getElementsByTagName("input")[0].value;
                geolocation(locationName).then((locationResponse) => {
                let longitude = locationResponse.results[0].geometry.location.lng,
                    latitude = locationResponse.results[0].geometry.location.lat;
                this.getWeatherInfo(longitude, latitude) 
            })
            .catch(e => {
                console.error(e);
                geolocationInfo.innerHTML = '<li>An error occured</li>';
                geolocationInfo.style.display = "block";
            });
            }
            
            geolocationInfo.style.display = "none";
            
        });
        return this;
    }
}