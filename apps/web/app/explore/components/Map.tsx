"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl:
    "https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/error-500_f9bbb4.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

function CtrlWheelZoom() {
  const map = useMap();

  useEffect(() => {
    const el = map.getContainer();

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      if (e.deltaY < 0) map.zoomIn();
      else map.zoomOut();
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, [map]);

  return null;
}

export default function Map() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <ZoomControl position="topright" />
      <CtrlWheelZoom />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[51.505, -0.09]} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
