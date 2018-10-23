import React, { Component } from 'react';
import { View } from 'react-native';
import { Slides } from '../components';

const SLIDE_DATA = [
  {
    text: 'Welcome to JobApp',
    color: '#03A9F4'
  },
  {
    text: 'Set your location, then swipe away!',
    color: '#009688'
  },
  {
    text: 'Right then lets get on with it!',
    color: '#03A9F4'
  }
];

class WelcomeScreen extends Component {
  //We can set an arrow function here instead of onSlidesComplete() {},
  //in which case we don't need to bindthis to context when we call this below in the render
  onSlidesComplete = () => {
    this.props.navigation.navigate('authorisation');
  }

  render() {
    return (
      <Slides slideData={SLIDE_DATA} onSlidesComplete={this.onSlidesComplete} />
    );
  }
}

export { WelcomeScreen };
