import L from "leaflet";

const size = 30;

export const MainIcon = new L.Icon({
  iconUrl: "./assets/icons/tomato.svg",

  iconSize: [size, size],
  iconAnchor: [0, size],
  popupAnchor: [0.5 * size, -size]
});
