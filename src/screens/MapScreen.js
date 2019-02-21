import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import * as actions from '../actions';

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

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
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
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search this area"
            backgroundColor="#009688"
            onPress={this.onButtonPress}
          />
        </View>
        </View>
      );
    }
  }

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20
  },
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
};

export default connect(null, actions)(MapScreen);
