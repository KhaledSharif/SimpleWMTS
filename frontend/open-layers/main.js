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

class OpenLayersFrontend {
    constructor(domSelector) {
        // init. a OpenLayers map and set the init. view
        this.map = new Map({
            layers: [],
            target: domSelector,
            controls: OLControl.defaults({
                attributionOptions: {
                    collapsible: false,
                }
            }),
            view: new View({
                center: [-11158582, 4813697],
                zoom: 4
            })
        });

        // init. WMTS specific properties
        this._wmtsSpecificPropertiesInit();

        // init. the WMTS tile layer to null
        this._WMTSTileLayer = null;

        // init. the layer name
        this._layerName = null;
    }

    _wmtsSpecificPropertiesInit() {
        this._projection = OLProjections.get('EPSG:3857');
        this._projectionExtent = this._projection.getExtent();
        this._size = OLExtent.getWidth(this._projectionExtent) / 256;
        this._resolutions = new Array(14);
        this._matrixIds = new Array(14);
        for (var z = 0; z < 14; ++z) {
            this._resolutions[z] = this._size / Math.pow(2, z);
            this._matrixIds[z] = z;
        }
    }

    layerChanged() {
        if (this._WMTSTileLayer) this.map.removeLayer(this._WMTSTileLayer);
        this._WMTSTileLayer = new TileLayer({
            opacity: 1,
            source: new WMTSSource({
                attributions: '',
                url: 'getTile',
                layer: this.layerName,
                matrixSet: 'EPSG:3857',
                format: 'image/jpg',
                projection: this._projection,
                tileGrid: new WMTSTileGrid({
                    origin: OLExtent.getTopLeft(this._projectionExtent),
                    resolutions: this._resolutions,
                    matrixIds: this._matrixIds,
                }),
                style: 'default',
                wrapX: true,
            }),
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

Window.mapProvider = new OpenLayersFrontend('map');