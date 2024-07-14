import React, { useRef, useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './viewer.css';

const Viewer = ({ suckItem }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState(800); // Default size

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerSize(width);
      }
    };

    handleResize(); // Initial size calculation
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const radius = containerSize / 2.6; // Adjust radius based on container size
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;

  // Calculate the positions for the teams in a circle
  const calculatePositions = (teams) => {
    const angleStep = (2 * Math.PI) / teams.length;
    return teams.map((team, index) => {
      const angle = index * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { ...team, x, y };
    });
  };

  const teams = suckItem?.teams ? calculatePositions(suckItem.teams) : [];

  // Calculate the size of the logos based on the container size and number of teams
  const logoSize = containerSize / (Math.max(teams.length, 4)) * 0.9;

  return (
    <div ref={containerRef} className="viewer-wrapper">
      <TransformWrapper>
        <TransformComponent>
          <div className="circle-container" style={{ width: containerSize, height: containerSize }}>
            {teams.map((team, index) => (
              <div key={index} className="team" style={{ left: team.x, top: team.y }}>
                <img
                  src={team.logo}
                  alt={team.name}
                  className="team-logo"
                  style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
                />
                {/* <span className="team-name">{team.name}</span> */}
              </div>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default Viewer;
