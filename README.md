# react-native-carousel

**NOTE**
This is a refactored carousel from react-native-swiper: https://github.com/leecade/react-native-swiper
I did this to have a more simpler way to view it's code. Removed some things like the ability to add different type of styling.
If you are looking for a more powered and more functional swiper / carousel, I recommend you checking them out. It is pretty well documentated.

## Install

`npm i --save react-native-carousel-swiper`

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

## Props

|   Props   |  type  | Default |        Description        |
| :-------: | :----: | :-----: | :-----------------------: |
|   loop    |  bool  |  true   |         Auto loop         |
|  arrows   |  bool  |  true   |        Show Arrows        |
|  bullets  |  bool  |  true   | Show Bullets (pagination) |
| loopTimer | number |    5    |    Time for auto loop     |

## Contribute

There is a lot of things I still havent done due to time, more help would be really nice.
If so please keep in mind that I would love to keep small components.
