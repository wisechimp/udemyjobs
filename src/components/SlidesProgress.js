import React, { Component } from 'react';
import { Animated, View } from 'react-native';

class SlidesProgress extends Component {
  render() {
    return this.props.slideData.map((slide, index) => {
      return (
        <View
          style={{ flexDirection: 'row' }}
        >
          <Animated.View
            key={index}
            style={styles.dotStyle}
          />
        </View>
      );
    });
  }
}

const styles = {
  dotStyle: {
    height: 10,
    width: 10,
    backgroundColor: '#595959',
    margin: 8,
    borderRadius: 5
  }
};

export { SlidesProgress };
