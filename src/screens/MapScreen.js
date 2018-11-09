import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

const region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

class MapScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <MapView
          region={region}
          style={styles.map}
        />
      </View>
    );
  }
}

const styles = {
 container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
};

export { MapScreen };
