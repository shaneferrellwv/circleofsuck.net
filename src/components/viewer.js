import React from 'react';

const Viewer = ({ selectedItems, suckItem }) => {
  return (
    <div>
      <h2>Selected Values</h2>
      <ul>
        {selectedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {suckItem && (
        <div>
          <h2>Suck Item</h2>
          <pre>{JSON.stringify(suckItem, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Viewer;
