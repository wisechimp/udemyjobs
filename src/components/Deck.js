import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
 } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH / 4;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        console.log(gesture);
        //We're mutating state!
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.finishSwipe(SCREEN_WIDTH);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.finishSwipe(-SCREEN_WIDTH);
        } else {
          this.resetPosition();
        }
      }
    });
      //Could write: this.panResponder = panResponder;
      //But this is generally used despite state never being latered
      this.state = { panResponder, position, index: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  finishSwipe(swipeDirection) {
    Animated.timing(this.state.position, {
      toValue: { x: swipeDirection, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(swipeDirection));
  }

  onSwipeComplete(swipeDirection) {
    //const { data } = this.props;
    //const item = data[this.state.index];

    //As usual this can be simply this.position if I go in that direction
    this.state.position.setValue({ x: 0, y: 0 });

    if (swipeDirection > 0) {
      this.setState({ index: this.state.index + 1 });
    } else {
      console.log('WFT');
    }
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data.map((item, arrayIndex) => {
      if (arrayIndex < this.state.index) {
        return null;
      }

      if (arrayIndex === this.state.index) {
      return (
        <Animated.View
          key={item.id}
          style={[this.getCardStyle(), styles.cardStyle]}
          {...this.state.panResponder.panHandlers}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    }

      return (
        <Animated.View
          key={item.id}
          style={[
            styles.cardStyle,
            { top: 10 * (arrayIndex - this.state.index) }
          ]}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    }).reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    //Can use left: 0 and right: 0 but not great when animating!
    width: SCREEN_WIDTH
    }
};

export { Deck };
