import React from 'react';
import { Trash2 } from 'lucide-react';

const PlantCard = ({ plant, onDelete }) => {
  return (
    <div className="bg-[#e6f0f3] rounded-xl p-6 mb-6 shadow-sm relative">
      <div className="md:hidden absolute top-4 right-4">
        <button
          onClick={onDelete}
          className="border border-gray-400 text-gray-700 px-3 py-1.5 rounded-md hover:bg-red-100 flex items-center space-x-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="font-semibold mr-2">Plant:</span>
            <select
              defaultValue={plant.plant}
              disabled
              className="border px-2 py-1 rounded bg-gray-100 w-40 md:w-full"
            >
              <option value="2000509">2000509</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Treatment:</span>
            <span>{plant.treatment}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Price Group:</span>
            <span>{plant.priceGroup}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <span className="font-semibold mr-2">Amount:</span>
            <span>{plant.amount}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Batch:</span>
            <span>{plant.batch}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Certificate number:</span>
            <span>{plant.certificate}</span>
          </div>
        </div>

        <div className="space-y-3 mt-10 md:mt-0">
          <div className="hidden md:flex justify-end">
            <button
              onClick={onDelete}
              className="border border-gray-400 text-gray-700 px-3 py-1.5 rounded-md hover:bg-red-100 flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Not Prepared:</span>
            <input
              type="checkbox"
              checked={plant.notPrepared}
              readOnly
              className="w-5 h-5 ml-2"
            />
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Provinens:</span>
            <span>{plant.provinens}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
