import React from 'react';

const PlantCard = ({ plant }) => {
  return (
    <div className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
      {/* Section 1 */}
      <div className="flex justify-between mb-2">
        <div><span className="font-semibold">Plant:</span> {plant.plant}</div>
        <div><span className="font-semibold">Amount:</span> {plant.amount}</div>
      </div>

      {/* Section 2 */}
      <div className="flex justify-between mb-2 flex-wrap gap-2">
        <div><span className="font-semibold">Treatment:</span> {plant.treatment}</div>
        <div><span className="font-semibold">Batch:</span> {plant.batch}</div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Not Prepared:</span>
          <input type="checkbox" checked={plant.notPrepared} readOnly className="w-4 h-4" />
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex justify-between flex-wrap gap-2">
        <div><span className="font-semibold">Price Group:</span> {plant.priceGroup}</div>
        <div><span className="font-semibold">Certificate number:</span> {plant.certificate}</div>
        <div><span className="font-semibold">Provinens:</span> {plant.provinens}</div>
      </div>
    </div>
  );
};

export default PlantCard;
