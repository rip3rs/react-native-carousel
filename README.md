# react-native-carousel

Yet another carousel... This allows for video and any type of component within the carousel.

This is meant for really low performance ANDROID tablets.

**NOTE**

Currently this module does not support IOS, as I only really needed it for android. I will fix this though.

## Install

`npm i --save react-native-carousel-swiper`

or

`yarn add react-native-carousel-swiper`

## Usage

```javascript
import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import Carousel from 'react-native-carousel';

export default class App extends Component {

  ...

  render() {
    return (
      <Carousel loop?={true | false} arrows?={true | false} bullets?={true | false}  loopTimer?={ number } >
        <Text>'Hello World!'</Text>
        <View><Text>'Hello World! 2'</Text></View>
        <Image source={{ uri: `<some Path>`, scale: 1 }} />
      </Carousel>
    );
  }
}
```

You may pass individual component attributes to the carousel.
An example usecase is so to make an auto slider slide on a specific time for each component,
like imagine an image is meant to slide for 10 seconds whilst the other image for 25 seconds.

To do this there MUST be a object that is passed (these are the MAIN attr that reads):

| Attributes  |  type  |               Description                |
| :---------: | :----: | :--------------------------------------: |
|   isVideo   |  bool  |         If it is a Video (\*\*)          |
| runningtime | number | Time running each component (in seconds) |

\*\* Video you will have to have either [NPM: React Native Video](https://www.npmjs.com/package/react-native-video) or something else in your custom component.
What this is doing is creating a empty black `<View>` so that ONLY when the video in being seen it loads. this is to make sure that we don't kill the tablet.

**NOTE**

For video you MUST add the attr isVideo.

example:

```javascript
  let slideComponentsWAttr = [
    {attr: { isVideo: true, runningTime: 120 }, component: <CustomComponent /> }
    {attr: { runningTime: 25 }, component: <View /> }
    {component: <Text /> }
  ];
```

Example:

```javascript
import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import Carousel from 'react-native-carousel';
import CustomComponent from './customComponent/customComponent';

export default class App extends Component {

  ...

  let pages = [
    {attr: { isVideo: true, runningTime: 120 }, component: <CustomComponent /> }
    {attr: { runningTime: 25 }, component: <View /> }
    {component: <Text /> }
  ];

  render() {
    return (
      <Carousel loop?={true | false} arrows?={true | false} bullets?={true | false}  loopTimer?={ number } >
        {pages}
      </Carousel>
    );
  }
}
```

## Props

|   Props   |  type  | Default |        Description        |
| :-------: | :----: | :-----: | :-----------------------: |
|  loop     |  bool  |  true   |         Auto loop         |
|  swipe    |  bool  |  true   |    Switch swipe on off    |
|  arrows   |  bool  |  true   |        Show Arrows        |
|  bullets  |  bool  |  true   | Show Bullets (pagination) |
| loopTimer | number |    5    |    Time for auto loop     |

## Todo

- Add IOS compatibility
- Add custom styling into props
- If on loop fade out Arrows, once touched show back arrows
- TESTS. . . .

## Contribute

There is a lot of things I still havent done due to time, more help would be really nice.
If so please keep in mind that I would love to keep small components.
