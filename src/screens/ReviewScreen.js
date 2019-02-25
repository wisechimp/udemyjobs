import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
        title='Settings'
        onPress={() => navigation.navigate('settings')}
      />
    )
  });

  renderLikedJobs() {
    const initialRegion = {
      latitude: 37,
      longitude: -122,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return this.props.likedJobs.map(job => {
      const {
        company, created_at,
        url, title, id } = job;

      return (
        <Card title={title} key={id}>
          <View style={{ height: 200 }}>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{created_at}</Text>
            </View>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              initialRegion={initialRegion}
            />
            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    marginBottom: 10,
    flexDirectioin: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
};

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
