import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API, MBOX_URL} from '@env';
import {useSelector} from 'react-redux';
import {selectDropAddress, selectPickupAddress} from '../slices/navSlice';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(MAPBOX_API);

//here we will define map components which will show the location and route info on map...
const pickupCordinates1 = [76.9799513, 28.1231292];

//Double map will show both pickup and drop location on map...
const DoubleMapComponent = () => {
  const [routes, setRoutes] = React.useState();
  const pickupCordinates = useSelector(selectPickupAddress);
  const dropCordinates = useSelector(selectDropAddress);
  // const centerCordinates = [(Number(pickupCordinates[0]) + Number(dropCordinates[0])) / 2,
  // (Number(pickupCordinates[1]) + Number(dropCordinates[1])) / 2];
  const route = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routes,
        },
        style: {},
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8,
        },
      },
    ],
  };
  React.useEffect(() => {
    getDirections();
  }, []);
  const getDirections = async () => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCordinates[0]}%2C${pickupCordinates[1]}%3B${dropCordinates[0]}%2C${dropCordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_API}`,
      );
      const json = await res.json();
      const data = json.routes[0];
      const routeCoordinates = data.geometry.coordinates;
      setRoutes(routeCoordinates);
      console.log('route 1 data is : ', data);
      console.log('geometry data is : ', routeCoordinates);
    } catch (error) {
      console.error(error);
    }
  };
  if (routes == undefined) {
    return null;
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: '100%', height: '100%'}}>
        <MapboxGL.MapView
          style={{flex: 1}}
          styleURL={MBOX_URL}
          padding={4}
          attributionEnabled={false}
          centerCoordinate={pickupCordinates}
          zoomEnabled={true}
          animated={true}
          followUserLocation>
          <MapboxGL.ShapeSource id="route1" shape={route}>
            <MapboxGL.LineLayer
              id="route1layer"
              style={{lineColor: 'orange', lineWidth: 2, lineCap: 'round'}}
            />
          </MapboxGL.ShapeSource>

          <MapboxGL.Camera
            zoomLevel={12}
            animated={true}
            animationMode="flyTo"
            centerCoordinate={pickupCordinates}
            animationDuration={1200}
          />

          <MapboxGL.PointAnnotation
            followUserLocation
            animated={true}
            id="p"
            key="pickup"
            coordinate={pickupCordinates}
          />
          <MapboxGL.PointAnnotation
            id="d"
            key="drop"
            coordinate={dropCordinates}
          />
        </MapboxGL.MapView>
      </View>
    </View>
  );
};
const MapComponent = () => {
  const pickupCordinates = useSelector(selectPickupAddress);
  const dropCordinates = useSelector(selectDropAddress);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: '100%', height: '100%'}}>
        <MapboxGL.MapView
          style={{flex: 1}}
          styleURL={MBOX_URL}
          attributionEnabled={false}
          centerCoordinate={pickupCordinates}
          zoomEnabled={true}
          animated={true}
          followUserLocation>
          <MapboxGL.Camera
            zoomLevel={12}
            centerCoordinate={pickupCordinates}
            followUserLocation
          />
          <MapboxGL.PointAnnotation id="point" coordinate={pickupCordinates} />
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export {DoubleMapComponent};
export default MapComponent;

const styles = StyleSheet.create({});
