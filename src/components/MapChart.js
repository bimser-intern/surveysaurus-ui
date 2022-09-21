import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";





const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.24, 0.68])
  .range(["#C5F0CF", "#C5F0CF"]);

const MapChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 127
      }}
    ><ZoomableGroup>
      <Sphere stroke="#E4E5E6" fill="#5380EA" strokeWidth={0.5} />
      <Graticule  stroke="#E4E5E6" strokeWidth={0.1} />
      {data.length > 0 && (
        <Geographies  geography={geoUrl} stroke="#000000">
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.code === geo.id);
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(d["2017"]) : "#C5F0CF"}
                  style={{
                    default:{
                      
                      outline:"none"
                    } ,
                  }}
                />
              );
            })
          }
        </Geographies>
      )}
      </ZoomableGroup>
    </ComposableMap>
    
  );
};

export default MapChart;
