import * as React from 'react';
import { Map as LeafletMap, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import Control from 'react-leaflet-control';
import { icon } from 'leaflet';
import { useGeolocation } from 'react-use';

import CenterButton from './CenterButton';
import iconUrl from './icon.svg';

const fetchGeoJson = async (setKmlData: React.Dispatch<any>) => {
  const response = await fetch('/api/geo-json');
  const body = await response.json();

  setKmlData(body.data);
};

const userIcon = icon({
  iconUrl,
  iconSize: [80, 80],
  iconAnchor: [40, 40],
});

const Map: React.FunctionComponent<{}> = () => {
  const map = React.useRef(null);
  const [kmlData, setKmlData] = React.useState(null);

  React.useEffect(() => {
    fetchGeoJson(setKmlData);
  }, []);

  const {
    loading,
    latitude,
    longitude,
  }: {
    loading: boolean;
    latitude: number;
    longitude: number;
  } = useGeolocation();

  const geolocationWorks = !loading && latitude && longitude;
  const userPosition: [number | null, number | null] = [latitude, longitude];

  const centerUserPosition = React.useCallback(() => {
    map.current.leafletElement.panTo(userPosition);
  }, [userPosition]);

  return (
    <LeafletMap
      ref={map}
      center={[-37.814958, 144.960667]}
      zoom={15}
      touchZoom={true}
      style={{ height: '100vh' }}
    >
      {geolocationWorks && (
        <>
          <Control position="topleft">
            <CenterButton onClick={centerUserPosition} />
          </Control>
          <Marker position={userPosition} icon={userIcon} />
        </>
      )}
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {kmlData && (
        <GeoJSON
          data={kmlData}
          style={() => ({
            color: '#cce231',
            opacity: 0.8,
            weight: 6,
            fillColor: '#75c43e',
            fillOpacity: 0.4,
          })}
        />
      )}
    </LeafletMap>
  );
};

export default React.memo(Map);
