require('../miscellaneous/misc.css');
var defaults = require('../miscellaneous/misc.js');
defaults.run();

require('cesium/Source/Widgets/widgets.css');
require('./styling.css');
var CesiumLibrary = require('cesium/Source/Cesium');
window.CESIUM_BASE_URL = '/';

var CesiumViewer = new CesiumLibrary.Viewer('map',
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
    imageryProvider : new CesiumLibrary.WebMapTileServiceImageryProvider({
        url : 'getTile',
        layer : '0',
        style : 'default',
        tileMatrixSetID : 'GoogleMapsCompatible_Level9',
        maximumLevel : 5,
        format : 'image/jpeg'
    }),
    mapProjection : new CesiumLibrary.WebMercatorProjection()
});