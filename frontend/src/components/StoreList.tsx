import React from 'react';
import { Store } from '../types';

interface StoreListProps {
  stores: Store[];
}

const StoreList: React.FC<StoreListProps> = ({ stores }) => {
  const getDirectionsUrl = (store: Store) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Nearby Stores</h2>
      <div className="space-y-4">
        {stores.map(store => (
          <div key={store.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium">{store.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{store.address}</p>
            <a
              href={getDirectionsUrl(store)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 text-sm mt-2 inline-block"
            >
              Get Directions
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;