import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import L from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";

import { promiseToFlyTo, getCurrentLocation } from "lib/map";

import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";
import Snippet from "components/Snippet";

import gatsby_astronaut from "assets/images/gatsby-astronaut.jpg";

import {markerData} from "data/markers-data.js";

const LOCATION = {
  lat: 41.825226,
  lng: -71.418884,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;
const ZOOM = 10;

const timeToZoom = 2000;
const timeToOpenPopupAfterZoom = 4000;
const timeToUpdatePopupAfterZoom = timeToOpenPopupAfterZoom + 3000;

const popupContentHello = `<p>Test</p>`;

/**
 * MapEffect
 * @description This is an example of creating an effect used to zoom in and set a popup on load
 */

const MapEffect = () => {
  const map = useMap();

  useEffect(() => {

    (async function run() {
      const defaultLocation = await getCurrentLocation().catch(() => LOCATION);
      setTimeout(async () => {
        await promiseToFlyTo(map, {
          zoom: ZOOM,
          center: defaultLocation,
        });
      }, timeToZoom);
    })();
  }, [map]);

  return null;
};

const IndexPage = () => {
  const [activeFilters, setFilters] = useState([]);
  const [markerDisplayData, setDisplayData] = useState(markerData);

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
    maxZoom: ZOOM,
  };

  const onChange = (e) => {
    let val = e.target.getAttribute('data-val');
    let currFilters = [ ...activeFilters ];
    if (!e.target.checked) {
      setFilters(currFilters.filter((f) => f != val)); 
    } else {
      currFilters.push(val);
      setFilters(currFilters);
    }
  }

  useEffect(() => {
    let newDisplayData = [...markerData];
    if (activeFilters.length) {
      newDisplayData = newDisplayData.filter((f) => {
        for (let category of f.categories) {
          if (activeFilters.includes(category)) {
            return true
          }
        }
        return false
      });
    }
    console.log(newDisplayData, activeFilters);
    setDisplayData(newDisplayData);
  }, [activeFilters])

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}>
        <MapEffect />
        {
          markerDisplayData.map((marker) => {
            return (
              <Marker position={marker.coords}>
                <Popup>
                  <div dangerouslySetInnerHTML={{__html: marker.content}} />
                </Popup>
              </Marker>
            )
          })
        }
      </Map>

      <div id="controls">
        {
          markerData.map((marker) => {
            return (
              <React.Fragment>
                { 
                  marker.categories.map((category) => {
                    return (
                      <React.Fragment>
                        <label>{category}</label>
                        <input 
                          type="checkbox" 
                          id={`${category}-filter`} 
                          data-val={category}
                          onChange={onChange} 
                        /> 
                      </React.Fragment>
                    )
                  })
                }
              </React.Fragment>
            ) 
          })
        }
      </div>
    </Layout>
  );
};

export default IndexPage;
