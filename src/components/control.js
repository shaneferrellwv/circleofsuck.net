import React, { useEffect } from 'react';
import './control.css';

const Control = ({ circleOfSuckTree, selectedItems, setSelectedItems, setSuckItem }) => {

  useEffect(() => {
    if (selectedItems.length === 0 || selectedItems[0] === '' || selectedItems[1] === '' || (selectedItems[2] === '' && selectedItems.length === 3)) {
      setSuckItem("Select a league");
    }
  }, [selectedItems, setSuckItem]);

  const handleSelect = (level, value) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[level] = value;
    setSelectedItems(newSelectedItems.slice(0, level + 1));
  };

  const clearSelection = (level) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[level] = '';
    setSelectedItems(newSelectedItems.slice(0, level + 1));
  };

  const renderDropdown = (options, level, showLeagueLabel) => {
    let label;
    if (level === 0) {
      label = 'Sport';
    } else if (level === 1) {
      label = 'Season';
    } else if (showLeagueLabel) {
      label = 'League';
    }

    const hasSelection = selectedItems[level] && selectedItems[level] !== '';

    return (
      <div key={level} className="dropdown-container">
        {label && <label className="dropdown-label">{label}</label>}
        <div className={`dropdown-wrapper ${hasSelection ? 'has-selection' : ''}`}>
          <select onChange={(e) => handleSelect(level, e.target.value)} value={selectedItems[level] || ''} className="dropdown-select">
            <option value="" disabled>Select an option</option>
            {Object.keys(options).filter(key => key !== 'suck').map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          {hasSelection && (
            <button onClick={() => clearSelection(level)} className="clear-button">x</button>
          )}
        </div>
      </div>
    );
  };

  const renderDropdowns = () => {
    const dropdowns = [];
    let level = 0;
    let items = circleOfSuckTree;
    let suckItemSet = false;
    while (Object.keys(items).length) {
      if (Object.keys(items).includes('suck')) {
        setSuckItem(items['suck']);
        suckItemSet = true;
      } 
      else if (level === 0 || level === 1 || (level === 2 && !selectedItems[level])) {
        setSuckItem("incomplete");
      } 
      else if (!suckItemSet) {
        setSuckItem("not-found");
      }
      if (Object.keys(items).length === 1 && Object.keys(items)[0] === 'suck') {
        break;
      }
      dropdowns.push(renderDropdown(items, level, level === 2));
      const selectedItemKey = selectedItems[level];
      if (selectedItemKey && items[selectedItemKey]) {
        items = items[selectedItemKey];
      } else {
        break;
      }
      level++;
    }
    return dropdowns;
  };

  return <div className="dropdowns-container">{renderDropdowns()}</div>;
};

export default Control;
