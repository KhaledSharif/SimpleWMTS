from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from tempfile import TemporaryDirectory
from glob import glob
from functions import *
from geotiff import GeoTIFF

# =======================================
# Global variables
# =======================================
app = Flask(__name__, static_folder='../frontend')
CORS(app)
temporary_directory = TemporaryDirectory()
geotiff_files = "../geotiffs/**/*.tif"
geotiff_files = glob(geotiff_files, recursive=True)
geotiff_files = [GeoTIFF(k) for k in geotiff_files]
geotiff_files = {k.name:k for k in geotiff_files}

# =======================================
# Flask routing function A
# getLayers route: returns a JSON list containing 
# information about the available GeoTIFF layers
# =======================================
@app.route('/getLayers')
def get_layers():
    return jsonify([gf.to_json() for gf in geotiff_files.values()])

# =======================================
# Flask routing function B
# getTile route: returns a file of mime type 
# `image/jpg` that matches the given WMTS request
# =======================================
@app.route('/getTile')
def get_tile():
    required_parameters = [
        'layer',
        'style',
        'tilematrixset',
        'service',
        'request',
        'version',
        'format',
        'tilematrix',
        'tilecol',
        'tilerow',
    ]
    request_args = {k.lower():v for k, v in request.args.items()}
    required_parameters = {k:request_args[k] for k in required_parameters}

    assert required_parameters["layer"] in geotiff_files, \
        "The layer {} does not exist!".format(required_parameters["layer"])
    geotiff_file = geotiff_files[required_parameters["layer"]]

    if ":" in required_parameters["tilematrix"]:
        required_parameters["tilematrix"] = required_parameters["tilematrix"].split(":")[-1]

    integers = ["tilematrix", "tilecol", "tilerow"]
    for i in integers:
        required_parameters[i] = int(required_parameters[i])
    
    return send_file(
        make_tile_if_nonexistent(
            zoom=required_parameters["tilematrix"],
            xtile=required_parameters["tilecol"],
            ytile=required_parameters["tilerow"],
            temp_dir=temporary_directory,
            geotiff_file=geotiff_file,
        ), mimetype='image/jpg')


# =======================================
# Main entrypoint
# =======================================
if __name__ == "__main__":
    app.run(host = '0.0.0.0', port=4815, debug=False, threaded=True)