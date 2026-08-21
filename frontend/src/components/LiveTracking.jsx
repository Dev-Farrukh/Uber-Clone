import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icons via CDN
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const STREET_ZOOM = 17;
const defaultCenter = { lat: -3.745, lng: -38.523 };

const MapRecenter = ({ center }) => {
  const map = useMap();
  const hasCenteredOnce = useRef(false);

  useEffect(() => {
    if (center.lat && center.lng) {
      if (!hasCenteredOnce.current) {
        map.setView([center.lat, center.lng], STREET_ZOOM, { animate: true });
        hasCenteredOnce.current = true;
      } else {
        map.panTo([center.lat, center.lng], { animate: true });
      }
    }
  }, [center, map]);

  return null;
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const locationIqKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude,
        });
      },
      (error) => console.error('Error fetching position:', error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    /* CRITICAL FIX: position: relative, zIndex: 0, and overflow: hidden keep Leaflet constrained */
    <div 
      style={{ 
        position: 'relative', 
        zIndex: 0, 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden' 
      }}
    >
      <MapContainer
        center={[currentPosition.lat, currentPosition.lng]}
        zoom={STREET_ZOOM}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${locationIqKey}`}
          attribution='&copy; <a href="https://locationiq.com">LocationIQ</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[currentPosition.lat, currentPosition.lng]} />
        <MapRecenter center={currentPosition} />
      </MapContainer>
    </div>
  );
};

export default LiveTracking;