require('../miscellaneous/misc.css');
var defaults = require('../miscellaneous/misc.js');
defaults.run();

require('cesium/Source/Widgets/widgets.css');
require('./styling.css');
var CesiumLibrary = require('cesium/Source/Cesium');
window.CESIUM_BASE_URL = '/';

class CesiumFrontend {
    constructor(domSelector) {
        // init. a Cesium map and set the init. view
        this.map = new CesiumLibrary.Viewer(domSelector,
        {
            shadows: true,
            animation: false,
            baseLayerPicker: false,
            fullscreenButton: false,
            geocoder: false,
            homeButton: false,
            infoBox: false,
            sceneModePicker: false,
            selectionIndicator: false,
            timeline: false,
            navigationHelpButton: false,
            navigationInstructionsInitiallyVisible: false,
            sceneMode : CesiumLibrary.SceneMode.SCENE3D,
            terrainProvider : new CesiumLibrary.CesiumTerrainProvider({
                url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles'
            }),
            baseLayerPicker : false,
            mapProjection : new CesiumLibrary.WebMercatorProjection()
        });

        // init. the WMTS tile layer to null
        this._WMTSTileLayer = null;

        // init. the layer name
        this._layerName = null;

        // always keep the cesium layers array inside the constructor
        this._cesiumLayers = this.map.scene.imageryLayers;
    }

    layerChanged() {
        if (this._WMTSTileLayer) this._cesiumLayers.remove(this._WMTSTileLayer);
        this._WMTSTileLayer = this._cesiumLayers.addImageryProvider(
            new CesiumLibrary.WebMapTileServiceImageryProvider({
                url : 'getTile',
                layer : this._layerName,
                style : 'default',
                tileMatrixSetID : 'GoogleMapsCompatible_Level9',
                maximumLevel : 5,
                format : 'image/jpeg',
        }));
    }

    get layerName() {
        return this._layerName;
    }

    set layerName(newLayerName) {
        this._layerName = newLayerName;
        this.layerChanged();
    }
}

Window.mapProvider = new CesiumFrontend('map');
