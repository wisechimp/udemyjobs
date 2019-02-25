import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import Deck from '../components/Deck';
import * as actions from '../actions';

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
  }

  renderCard(jobs) {
    const initialRegion = {
      latitude: 37,
      longitude: -122,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={jobs.title}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailedWrapper}>
          <Text>{jobs.company}</Text>
          <Text>{jobs.created_at}</Text>
        </View>
        <View style={{ height: 100 }}>
          <Text>
            {jobs.description.replace(/<\/*p>/g, '').replace(/<\/*ul>/g, '').replace(/<\/*li>/g, '')}
          </Text>
        </View>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No more jobs">
        <Button
          title="Back to Map"
          large
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Deck
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

function mapStateToProps({ jobs }) {
  return { jobs };
}

export default connect(mapStateToProps, actions)(DeckScreen);
