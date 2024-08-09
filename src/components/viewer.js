import React, { useRef, useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './viewer.css';

const Viewer = ({ suckItem }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState(800); // Default size
  const logoSrc = '../images/logo.png'; // Ensure this path is correct

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

  const radius = containerSize / 2.8; // Adjust radius based on container size
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;

  // Calculate the positions for the teams in a circle
  const calculatePositions = (teams) => {
    const angleStep = (2 * Math.PI) / teams.length;
    return teams.map((team, index) => {
      const angle = index * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { ...team, x, y, angle };
    });
  };

  const teams = suckItem?.teams ? calculatePositions(suckItem.teams) : [];
  const logoSize = containerSize / Math.max(teams.length, 4) * 0.9;
  const signSize = containerSize / Math.max(teams.length, 4) * 0.6;
  const gameInfoFontSize = containerSize / Math.max(teams.length, 8) * 0.25;

  // Function to calculate the midpoint and rotation angle for the greater-than signs
  const getMidpointAndAngle = (x1, y1, x2, y2) => {
    const midpoint = {
      x: (x1 + x2) / 2,
      y: (y1 + y2) / 2,
    };
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    return { midpoint, angle };
  };

  // Function to calculate the position of the game info
  const getGameInfoPosition = (midpoint, angle, offset) => {
    const radians = angle * (Math.PI / 180);
    offset = 1.1 + 0.22094 * Math.exp(-0.03962 * suckItem.teams);
    return {
      x: centerX + (radius * 1.15) * Math.cos(radians),
      y: centerY + (radius * 1.15) * Math.sin(radians),
    };
  };

  const gameInfoOffset = 0.7 * Math.exp(-0.1 * suckItem?.teams) + 1.18;

  // Check if there are any games with week '0'
  const hasWeekZero = suckItem?.games?.some(game => game.week === '0');

  return (
    <div ref={containerRef} className="viewer-wrapper">
      <TransformWrapper>
        <TransformComponent>
          <div className="circle-container" style={{ width: containerSize, height: containerSize }}>
            {suckItem === "incomplete" && (
              <div className="upper-message">
                <div>Please select a sport, season, and league</div>
              </div>
            )}
            {suckItem === "not-found" && (
              <div className="upper-message">
                <div>Circle of Suck not found.</div>
                <div>Try another sport, season, or league.</div>
              </div>
            )}
            {suckItem && suckItem.teams && suckItem.games && (
              <svg className="arrows" style={{ width: containerSize, height: containerSize }}>
                {teams.map((team, index) => {
                  const game = suckItem.games[index];
                  const nextTeam = teams[(index + 1) % teams.length];

                  const { midpoint, angle } = getMidpointAndAngle(team.x, team.y, nextTeam.x, nextTeam.y);
                  const gameInfoPos = getGameInfoPosition(midpoint, angle - 90, gameInfoOffset);

                  return (
                    <g key={index}>
                      <text
                        x={midpoint.x}
                        y={midpoint.y}
                        transform={`rotate(${angle}, ${midpoint.x}, ${midpoint.y})`}
                        className="greater-than"
                        style={{ fontSize: `${signSize}px` }}
                      >
                        &gt;
                      </text>
                      {game && (
                        <text
                          x={gameInfoPos.x}
                          y={gameInfoPos.y + (game.home_score === 0 ? 10 : 0)} // Adjust y position by 10 if home_score is 0
                          className="game-info"
                          style={{ fontSize: `${gameInfoFontSize}px` }}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {!hasWeekZero && (
                            <tspan x={gameInfoPos.x + (Math.abs(gameInfoPos.x) < 10 ? 5 : 0)} dy="-1.2em">
                              {game.week}
                            </tspan>
                          )}
                          {game.away_score + game.home_score !== 0 && (
                            <tspan x={gameInfoPos.x + (Math.abs(gameInfoPos.x) < 10 ? 5 : 0)} dy={!hasWeekZero ? "1.2em" : "-.6em"}>
                              {game.away_abbreviation} {game.away_score}
                            </tspan>
                          )}
                          {game.away_score + game.home_score !== 0 && (
                            <tspan x={gameInfoPos.x + (Math.abs(gameInfoPos.x) < 10 ? 5 : 0)} dy="1.2em">
                              {game.home_abbreviation} {game.home_score}
                            </tspan>
                          )}
                          {game.away_score === 0 && game.home_score === 0 && (
                            <tspan
                              x={gameInfoPos.x + (Math.abs(gameInfoPos.x) < 10 ? 5 : 0)}
                              dy="1.2em"
                              style={{ fontSize: `${gameInfoFontSize * 0.6}px` }}
                            >
                              score unavailable
                            </tspan>
                          )}
                        </text>
                      )}

                    </g>
                  );
                })}
              </svg>
            )}

            {/* {suckItem && suckItem.teams && suckItem.games && (
              <div className="lower-message">
                <img src={logoSrc} alt="Logo" className="lower-logo" />
                <div className="lower-text">circleofsuck.net</div>
              </div>
            )} */}
            {teams.map((team, index) => (
              <div key={index} className="team" style={{ left: team.x, top: team.y }}>
                <img
                  src={team.logo}
                  alt={team.name}
                  className="team-logo"
                  style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
                />
              </div>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default Viewer;
