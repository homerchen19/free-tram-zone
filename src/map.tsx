import * as React from 'react';
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
} from 'react-leaflet';
import { useGeolocation, useMount } from 'react-use';

const fetchGeoJson = async (setKmlData: React.Dispatch<any>) => {
  const response = await fetch('/api/geo-json');
  const body = await response.json();

  setKmlData(body.data);
};

const Map: React.FunctionComponent<{}> = () => {
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

  const position: [number, number] = [latitude, longitude];

  return (
    !loading &&
    kmlData && (
      <LeafletMap center={position} zoom={15} style={{ height: '100vh' }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <GeoJSON data={kmlData} />
      </LeafletMap>
    )
  );
};

export default Map;
