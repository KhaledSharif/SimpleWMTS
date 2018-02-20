// imports required for Leaflet to work
import './leaflet.css';
import './styling.css';
import L from 'leaflet';
import './leaflet-tilelayer-wmts.js';

// misc imports that are common between all map viewers
require('../miscellaneous/misc.css');
var defaults = require('../miscellaneous/misc.js');
defaults.run();

class LeafletFrontend {
    constructor(domSelector) {
        // init. a Leaflet map and set the init. view
        this.map = L.map(domSelector).setView([55.6, 13], 4);

        // add the metric scale to the bottom left of the map
        L.control.scale({
            'position': 'bottomleft',
            'metric': true,
            'imperial': false,
        }).addTo(this.map);

        // init. the WMTS tile layer to null
        this._WMTSTileLayer = null;

        // init. the layer name
        this._layerName = null;
    }

    layerChanged() {
        if (this._WMTSTileLayer) this._WMTSTileLayer.remove();
        this._WMTSTileLayer = new L.TileLayer.WMTS('getTile',
        {
            layer: this.layerName,
            style: 'default',
            tilematrixSet: '3006',
            format: 'image/jpg',
        });
        this.map.addLayer(this._WMTSTileLayer);
    }

    get layerName() {
        return this._layerName;
    }

    set layerName(newLayerName) {
        this._layerName = newLayerName;
        this.layerChanged();
    }
}

Window.mapProvider = new LeafletFrontend('map');


