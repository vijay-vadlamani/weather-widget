/**
 * @module src/app
 */
import MotherComponent from '../MotherComponent/MotherComponent.js';

import template from './Home.html!text';
// import stylesheet from './Home.scss!';

import {geolocation} from '../../Services/geolocation.js';
import {weather} from '../../Services/weather';

export default class Home extends MotherComponent {
    /**
     * Creates a full Home component with its whole logic encapsulated:
     *
     * * display of the result
     *
     * Example:
     *
     * ```
     * var myHome = (new Home('home')).init();
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

    /**
     * Inits the Home component, adding all its specific logic.
     * @method init
     * @chainable
     * @return {Components.Home.Home}
     */
    init() {

        let geolocationInfo = this.domNode.querySelector('.location');

        this.domNode.querySelector('.showLocation').addEventListener('click', () => {
            geolocationInfo.style.display = "none";
            geolocation()
                .then((result) => {
        let longitude = result.longitude,
            latitude = result.latitude;
                    weather(longitude, latitude);
                })
                .catch(e => {
                    console.error(e);
                    geolocationInfo.innerHTML = '<li>An error occured</li>';
                    geolocationInfo.style.display = "block";
                });
        }, false);
        return this;
    }
}