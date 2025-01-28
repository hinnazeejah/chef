import React from 'react';
import { Store } from '../types';
import { useLoadScript, GoogleMap, Marker, Libraries } from '@react-google-maps/api';

// Define libraries type
const libraries: Libraries = ['places'];

interface StoreMapProps {
  stores: Store[];
  userLocation: {
    lat: number;
    lng: number;
  };
}

const StoreMap: React.FC<StoreMapProps> = ({ stores, userLocation }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  const mapContainerStyle = React.useMemo(() => ({
    width: '100%',
    height: '400px'
  }), []);

  const options = React.useMemo(() => ({
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  }), []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation}
        zoom={13}
        options={options}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: '/user-location.png',
              scaledSize: isLoaded ? new window.google.maps.Size(40, 40) : null
            }}
          />
        )}
        
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={store.coordinates}
            title={store.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default StoreMap; 