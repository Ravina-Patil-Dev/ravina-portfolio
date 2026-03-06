import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { motion } from 'framer-motion';

const WorldHeatmap = ({ data = [] }) => {
  // World map topology
  const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

  // Color scale for heatmap
  const getColor = (intensity) => {
    if (intensity > 0.8) return '#ff0000';
    if (intensity > 0.6) return '#ff6600';
    if (intensity > 0.4) return '#ffaa00';
    if (intensity > 0.2) return '#ffff00';
    return '#00ff00';
  };

  return (
    <div className="world-heatmap w-full h-96 bg-slate-900 rounded-lg overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
          center: [0, 20],
        }}
        className="w-full h-full"
      >
        <ZoomableGroup zoom={1} center={[0, 20]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1e293b"
                  stroke="#334155"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: '#334155' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {data.map((point, index) => (
            <Marker key={index} coordinates={[point.longitude, point.latitude]}>
              <motion.circle
                r={point.intensity * 10}
                fill={getColor(point.intensity)}
                fillOpacity={0.6}
                stroke={getColor(point.intensity)}
                strokeWidth={2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.2,
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        <div className="flex items-center gap-2 mb-2">
          <span>Activity Level</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span>Low</span>
          <div className="w-4 h-4 rounded-full bg-yellow-500 mx-2"></div>
          <span>Medium</span>
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span>High</span>
        </div>
      </div>
    </div>
  );
};

export default WorldHeatmap;
