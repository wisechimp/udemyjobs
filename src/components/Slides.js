import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(index) {
    console.log(index.length);
    if (index === this.props.slideData.length - 1) {
      return (
        <Button
          title="Onwards!"
        />
      );
    }
  }

  renderSlides() {
    return this.props.slideData.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[
            styles.slideStyle,
            { backgroundColor: slide.color }
          ]}
        >
          <Text style={styles.textStyle}>
            {slide.text}
          </Text>
          {this.renderLastSlide(index)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: 'white'
  }
};

export { Slides };
