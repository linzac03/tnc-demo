export const mapServices = [
  {
    name: "OpenStreetMap",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  },
  {
    name: "BlueMarble",
    attribution: "&copy; NASA Blue Marble, image service by OpenGeo",
    url: "https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg",
  },
  {
    name: "Google",
    attribution: "&copy; Google Maps",
    url: "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  },
];
