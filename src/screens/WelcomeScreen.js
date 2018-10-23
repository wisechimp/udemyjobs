import React, { Component } from 'react';
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
  render() {
    return (
      <Slides slideData={SLIDE_DATA} />
    );
  }
}

export { WelcomeScreen };
