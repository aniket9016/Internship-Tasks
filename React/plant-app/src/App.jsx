import React from 'react';
import PlantCard from './Components/PlantCard';

const plantData = [
  {
    plant: '2000509',
    amount: 2780,
    treatment: 'Hylonox',
    batch: 'GR',
    notPrepared: true,
    priceGroup: 'A',
    certificate: 'sample text',
    provinens: 'Bredinge',
  },
  {
    plant: '2000510',
    amount: 3000,
    treatment: 'Hylonox',
    batch: 'XY',
    notPrepared: false,
    priceGroup: 'B',
    certificate: 'ABC123',
    provinens: 'Västerås',
  },
];

function App() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      {plantData.map((plant, idx) => (
        <PlantCard key={idx} plant={plant} />
      ))}
    </div>
  );
}

export default App;
