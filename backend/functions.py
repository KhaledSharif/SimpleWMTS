"""
get_gdal_info: Get information about a GeoTIFF file using the gdalinfo command

Parameters
----------
path_to_geotiff : str
"""
def get_gdal_info(path_to_geotiff: str) -> dict:
    # for documentation, see: http://www.gdal.org/gdalinfo.html
    gdal_info = "gdalinfo -json {}"

    import shlex, subprocess
    from json import loads
    args = shlex.split(gdal_info.format(path_to_geotiff))
    process = subprocess.Popen(args, stdout=subprocess.PIPE)
    output_string = ""
    while process.poll() is None:
        output = process.stdout.readline()
        if output:
            output_string += output.decode().strip()
    rc = process.poll()
    assert rc == 0 or rc is None, "Error! GDAL failed on [{}] with return code {}.".format(path_to_geotiff, rc)
    return loads(output_string)


"""
tile_file_path: Given x, y and zoom parameters from a WMTS GetTile request, construct an appropriate path

Parameters
----------
xtile : int
ytile : int
zoom : int
temp_dir : tempfile.TemporaryDirectory
geotiff_file : GeoTIFF
"""
def tile_file_path(xtile: int, ytile: int, zoom: int, temp_dir, geotiff_file) -> str:
    from tempfile import TemporaryDirectory
    assert isinstance(temp_dir, TemporaryDirectory)
    from os.path import join
    return join(temp_dir.name, "{}_{}_{}_{}.jpeg".format(geotiff_file.name, zoom, xtile, ytile))


"""
make_tile_if_nonexistent: Given x, y and zoom parameters, use the gdal_translate command to create a JPG tile

Parameters
----------
xtile : int
ytile : int
zoom : int
temp_dir : tempfile.TemporaryDirectory
geotiff_file: GeoTIFF
"""
def make_tile_if_nonexistent(xtile: int, ytile: int, zoom: int, temp_dir, geotiff_file) -> str:
    from tempfile import TemporaryDirectory    
    assert isinstance(temp_dir, TemporaryDirectory)
    temporary_path = tile_file_path(xtile, ytile, zoom, temp_dir, geotiff_file)

    # for documentation, see: http://www.gdal.org/gdal_translate.html
    gdal_translate = "gdal_translate -of jpeg -projwin {} {} {} {} -projwin_srs WGS84 -q -outsize 50% 0 {} {}"

    from os.path import isfile
    import shlex, subprocess

    if not isfile(temporary_path):
        ul_lat, ul_lon = wmts_to_lat_lng(
            zoom=zoom,
            xtile=xtile,
            ytile=ytile,
        )
        
        lr_lat, lr_lon = wmts_to_lat_lng(
            zoom=zoom,
            xtile=xtile + 1,
            ytile=ytile + 1,
        )

        # for reference: -projwin ulx uly lrx lry
        args = shlex.split(gdal_translate.format(
            ul_lon, ul_lat, lr_lon, lr_lat,
            geotiff_file.path,
            temporary_path,
        ))
        process = subprocess.Popen(args, stdout=subprocess.PIPE)
        while process.poll() is None:
            output = process.stdout.readline()
        rc = process.poll()
        
        assert rc == 0 or rc is None, \
            "Error! GDAL failed on [{}] with return code {}.".format(path_to_geotiff, rc)

    return temporary_path


"""
wmts_to_lat_lng: Get information about a GeoTIFF file using the gdalinfo command

Parameters
----------
xtile : int
ytile : int
zoom : int
"""
def wmts_to_lat_lng(xtile: int, ytile: int, zoom: int) -> tuple:
    # see: https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Lon..2Flat._to_tile_numbers_2
    from math import atan, sinh, pi, degrees
    n = 2.0 ** zoom
    lon_deg = xtile / n * 360.0 - 180.0
    lat_rad = atan(sinh(pi * (1 - 2 * ytile / n)))
    lat_deg = degrees(lat_rad)
    return lat_deg, lon_deg
