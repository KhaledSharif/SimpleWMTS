from functions import *
from geotiff import GeoTIFF
import unittest

class TestFunctions(unittest.TestCase):
    def __init__(self):
        super().__init__()
        self.temporary_directory = TemporaryDirectory()
        self.geotiff_files = "../geotiffs/**/*.tif"
        self.geotiff_files = glob(geotiff_files, recursive=True)
        self.geotiff_files = [GeoTIFF(k) for k in geotiff_files]
        self.geotiff_files = {k.name:k for k in geotiff_files}

    def test_get_gdal_info(self):
        for gf in self.geotiff_files.values():
            self.assertIsInstance(gf.path, str)
            self.assertTrue(len(gf.path) > 0)

            self.assertIsInstance(gf.name, str)
            self.assertTrue(len(gf.name) > 0)

            self.assertIsInstance(gf.info, dict)
            self.assertTrue(len(gf.info.values()) > 0)

    # work in progress
    def test_tile_file_path(self):
        for gf in self.geotiff_files.values():
            pass

    # work in progress    
    def test_make_tile_if_nonexistent(self):
        for gf in self.geotiff_files.values():
            pass

if __name__ == '__main__':
    unittest.main()