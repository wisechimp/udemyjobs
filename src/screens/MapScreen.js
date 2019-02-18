import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';

class MapScreen extends Component {

  state = {
    mapLoaded: false,
    region: {
      latitude: 37,
      longitude: -122,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <MapView
          region={this.state.region}
          style={styles.map}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        </View>
      );
    }
  }

const styles = {
 container: {
    flex: 1
  },
  map: {
    flex: 1
  }
};

export { MapScreen };
