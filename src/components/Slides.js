import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.slideData.length - 1) {
      return (
        <Button
          title="Onwards!"
          raised
          containerViewStyle={styles.containerStyle}
          buttonStyle={styles.buttonStyle}
          //We don't enter the () after onComplete because although it's
          //functional it would run as soon as the button was rendered!
          onPress={this.props.onSlidesComplete}
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
    color: 'white',
    textAlign: 'center'
  },
  buttonStyle: {
    backgroundColor: '#0288D1'
  },
  containerStyle: {
    marginTop: 15
  }
};

export { Slides };
