// imports required for Leaflet to work
import './leaflet.css';
import './styling.css';
import L from 'leaflet';
import './leaflet-tilelayer-wmts.js';

// misc imports that are common between all map viewers
require('../miscellaneous/misc.css');
var defaults = require('../miscellaneous/misc.js');
defaults.run();

// init Leaflet map and set the init view
var map = L.map('map').setView([55.6, 13], 4);

// add the metric scale to the bottom left of the map
L.control.scale({
    'position': 'bottomleft',
    'metric': true,
    'imperial': false,
}).addTo(map);

var WMTSTileLayer;
// define the common layerChanged function
Window.layerChanged = function () {
    if (WMTSTileLayer) WMTSTileLayer.remove();
    WMTSTileLayer = new L.TileLayer.WMTS('getTile',
    {
        layer: Window.layerName,
        style: 'default',
        tilematrixSet: '3006',
        format: 'image/jpg'
    });
    map.addLayer(WMTSTileLayer);
};

// call the layerChanged function on init
Window.layerChanged();

