import React, { useContext, Fragment } from "react";
import { Map, Marker, Popup, TileLayer, ImageOverlay } from "react-leaflet";
import L from "leaflet";

import { MainContext } from "../../App";
import { Nearby } from "../../utils/Nearby";
import { MainIcon } from "./Icons";

// the bug where the pins don't show
// https://github.com/PaulLeCam/react-leaflet/issues/453
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const Markers = ({ points, labels, icons }) => {
  if (points[0].length !== 2) {
    throw "points are not in an array of [lat, lng], cannot create Marker!";
  }

  const pinLbls = labels
    ? labels
    : [...Array(points.length)].map(() => "label");

  if (icons) {
    return points.map((p, i) => (
      <Marker key={i} position={p} icon={icons[i]}>
        <Popup>{pinLbls[i]}</Popup>
      </Marker>
    ));
  } else {
    return points.map((p, i) => (
      <Marker key={i} position={p}>
        <Popup>{pinLbls[i]}</Popup>
      </Marker>
    ));
  }
};

const closestObjects = (point, appState) => {
  const dataPos = appState.dataset.data.map(v => [v.latlng.lat, v.latlng.lng]);
  const closestIndices = Nearby(point, dataPos);

  const top3 = closestIndices.slice(0, 3);

  const closestObjects = appState.dataset.data.filter(
    (v, i) => top3.filter(w => w === i).length > 0
  );

  const closestPins = closestObjects.map(v => [v.latlng.lat, v.latlng.lng]);
  const closestLbls = closestObjects.map(v => v.label);

  return { pins: closestPins, lbls: closestLbls };
};

const LeafletMap = props => {
  const { height } = props;
  const appState = useContext(MainContext);

  let { point, setPoint } = appState;

  // markers
  // assumes one point as input
  const { pins, lbls } = closestObjects(point, appState);

  const handleMapClick = e => {
    //alert("clicked! at " + e.latlng.lat + " " + e.latlng.lng);
    setPoint([e.latlng.lat, e.latlng.lng]);
  };

  // national history museum map
  const localPosition = [50, 248];
  const localMapBounds = [[0, 0], [100, 400]];
  const localMap = (
    <Map
      center={localPosition}
      zoom={4}
      minZoom={3}
      maxZoom={6}
      style={{ height: height ? height : 300, width: "100%" }}
      onClick={handleMapClick}
    >
      <ImageOverlay
        alt="local map"
        url="./assets/maps/map-01-large.png"
        bounds={localMapBounds}
      />
      <Markers points={[point]} labels={["you are here!"]} icons={[MainIcon]} />
      <Markers points={pins} labels={lbls} />
    </Map>
  );

  return localMap;
};

export default LeafletMap;
