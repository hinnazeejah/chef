import React from 'react';
import { Price } from '../types';

interface PriceTableProps {
  prices: Price[];
  isLoading: boolean;
}

const PriceTable: React.FC<PriceTableProps> = ({ prices, isLoading }) => {
  if (isLoading) {
    return <div>Loading prices...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Ingredient Prices</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ingredient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {prices.map((price, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {price.ingredient}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {price.store}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${price.price.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTable;