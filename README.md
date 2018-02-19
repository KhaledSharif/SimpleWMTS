# SimpleWMTS
### Easily deploy your GeoTIFF files through the OGC WMTS standard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Getting started

First, download a GeoTIFF to test SimpleWMTS on. You can try the Natural Earth GeoTIFF [available here](http://www.naturalearthdata.com/downloads/50m-raster-data/50m-cross-blend-hypso/).

```bash
wget http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/raster/HYP_50M_SR_W.zip
unzip HYP_50M_SR_W.zip
mkdir ~/geotiffs && mv HYP_50M_SR_W/HYP_50M_SR_W.tif ~/geotiffs
```

Second, clone this repository to your local machine.

```bash
git clone https://github.com/KhaledSharif/SimpleWMTS.git simple-wmts
cd simple-wmts
```

Third, build and run the Docker container. As is, the container will start off with a minimal Leaflet UI.

```bash
docker build -f docker/Dockerfile.leaflet -t simplewmts:leaflet .
docker run -v ~/geotiffs:/geotiffs -p 7000:8080 simplewmts:leaflet
```

You may have to wait a while the container downloads dependencies required for the frontend. Once everything is ready, you will see the following line of output.

```
* Running on http://0.0.0.0:4815/ (Press CTRL+C to quit)
```

Success! Now visit the UI by going to `http://localhost:7000` in your browser. Every GeoTIFF you added to the `geotiffs` folder in your home directory will appear as a button at the top of the UI; click on that button to change Leaflet's base layer to that GeoTIFF file.

