class GeoTIFF:
    """
    GeoTIFF constructor: create class from a path to the GeoTIFF file

    Parameters
    ----------
    path_to_file : str
    """
    def __init__(self, path_to_file: str):
        from functions import get_gdal_info
        from os.path import abspath
        self.path = abspath(path_to_file)
        self.name = self.path.split("/")[-1].split(".")[0]
        self.info = get_gdal_info(self.path)

    """
    to_json: convert a GeoTIFF object to a dict to facilitate JSON conversion
    """
    def to_json(self):
        return {
            "path": self.path,
            "name": self.name,
            "info": self.info,
        }
