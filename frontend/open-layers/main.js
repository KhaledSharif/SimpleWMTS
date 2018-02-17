import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import OSMSource from 'ol/source/osm';
import WMTSSource from 'ol/source/wmts';
import WMTSTileGrid from 'ol/tilegrid/wmts';
import OLProjections from 'ol/proj';
import OLExtent from 'ol/extent';
import OLControl from 'ol/control';

require('../miscellaneous/misc.css');
var defaults = require('../miscellaneous/misc.js');
defaults.run();

var projection = OLProjections.get('EPSG:3857');
var projectionExtent = projection.getExtent();
var size = OLExtent.getWidth(projectionExtent) / 256;

var resolutions = new Array(14);
var matrixIds = new Array(14);
for (var z = 0; z < 14; ++z) {
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
}

var map = new Map({
    layers: [
        new TileLayer({
        opacity: 1,
        source: new WMTSSource({
            attributions: '',
            url: 'getTile',
            layer: '0',
            matrixSet: 'EPSG:3857',
            format: 'image/jpg',
            projection: projection,
            tileGrid: new WMTSTileGrid({
                origin: OLExtent.getTopLeft(projectionExtent),
                resolutions: resolutions,
                matrixIds: matrixIds,
            }),
            style: 'default',
            wrapX: true
        })
        })
    ],
    target: 'map',
    controls: OLControl.defaults({
        attributionOptions: {
        collapsible: false
        }
    }),
    view: new View({
        center: [-11158582, 4813697],
        zoom: 4
    })
});