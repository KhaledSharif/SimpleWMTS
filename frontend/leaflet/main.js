import './leaflet.css';
import './styling.css';
import L from 'leaflet';
import './leaflet-tilelayer-wmts.js';

require('../miscellaneous/misc.css');
var defaults = require('../miscellaneous/misc.js');
defaults.run();

var map = L.map('map').setView([55.6, 13], 4);

var url = 'getTile';

var WMTSTileLayer = new L.TileLayer.WMTS(url,
{
    layer: Window.layerName,
    style: 'default',
    tilematrixSet: '3006',
    format: 'image/jpg'
});

var baseLayers = {"SimpleWMTS" : WMTSTileLayer};
L.control.scale({
    'position': 'bottomleft',
    'metric': true,
    'imperial': false,
}).addTo(map);

map.addLayer(WMTSTileLayer);

L.control.layers(baseLayers, {}).addTo(map);

Window.layerChanged = function () {
    // console.log(Window.layerName);
    WMTSTileLayer.remove();
    WMTSTileLayer = new L.TileLayer.WMTS(url,
    {
        layer: Window.layerName,
        style: 'default',
        tilematrixSet: '3006',
        format: 'image/jpg'
    });
    map.addLayer(WMTSTileLayer);
};


