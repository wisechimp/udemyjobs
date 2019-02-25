import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import { Deck } from '../components';

class DeckScreen extends Component {

  renderCard(jobs) {
    return (
      <Card title={jobs.title}>
        <View style={styles.detailedWrapper}>
          <Text>{jobs.company}</Text>
          <Text>{jobs.created_at}</Text>
        </View>
        <Text>
          {jobs.description.replace(/<p>/g, '').replace(/<\/p>/g, '')}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
      <Card title="No more jobs">
      </Card>
    );
  }

  render() {
    return (
      <View>
        <Deck
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
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
  return {
    jobs
  };
}

export default DeckScreen;
