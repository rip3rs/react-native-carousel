/**
 * @flow strict
 */

import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  ViewPagerAndroid,
  TouchableOpacity
} from "react-native";
import Bullets from "./options/bullets";
import Arrows from "./options/arrows";

type Props = {
  children: Array<Object>,
  loop?: boolean,
  arrows?: boolean,
  bullets?: boolean,
  loopTimer: number
};

type State = {
  total: number,
  index: number,
  loopJump: boolean
};

class Carousel extends Component<Props, State> {
  static defaultProps = {
    loop: true,
    arrows: true,
    bullets: true,
    loopTimer: 5
  };

  scrollView: ViewPagerAndroid = null;
  state: State = this.initState();
  loopInterval: IntervalID;
  loopIntervalIsOn: boolean = false;
  dimensions: Object = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  };

  initState(): State {
    const { children } = this.props;
    return {
      total: children ? children.length || 1 : 0,
      index: 1,
      loopJump: false
    };
  }

  componentDidMount() {
    const { total } = this.state;
    const { loop } = this.props;

    if (total > 1 && loop) this.loop();
  }

  componentWillUnmount() {
    clearInterval(this.loopInterval);
  }

  onPageSelectedHandler = (e: Object): void => {
    this.calcIndex(e.nativeEvent.position);
  };

  onPageScrollStateHandler = (e: string): void => {
    switch (true) {
      case e === "dragging":
        console.log("on the draag");
        this.loopIntervalIsOn = false;
        clearInterval(this.loopInterval);
        console.log(this.loopInterval);
        break;
      case e === "idle" && !this.loopIntervalIsOn:
        this.loop();
        break;
    }
  };

  loop = (): void => {
    const { loopTimer } = this.props;
    this.loopIntervalIsOn = true;

    this.loopInterval = setInterval(
      () => this.calcIndex(this.state.index + 1, true),
      loopTimer * 1000
    );
  };

  calcIndex = (i: number, animated: boolean = false): void => {
    let index: number = i;
    let loopJump: boolean = false;

    if (index <= 0) {
      index = this.state.total;
      loopJump = true;
    } else if (index > this.state.total) {
      index = 1;
      loopJump = true;
    }

    this.setState(
      { ...this.state, index: index, loopJump },
      (): void => this.loopJump(animated)
    );
  };

  loopJump = (animated: boolean): void => {
    const { index, loopJump } = this.state;

    if (!animated && !loopJump) return;

    this.scrollView[
      animated && !loopJump ? "setPage" : "setPageWithoutAnimation"
    ](index);
  };

  scrollBy = (i: number): void => {
    const { index, total } = this.state;
    const newIndex: number = i + index;

    if (total < 2) return;

    this.calcIndex(newIndex, true);
  };

  render(): React$Node {
    const { children } = this.props;
    const { index, total } = this.state;

    let indexes: Array<number> = [];
    let pages: Array<React$Element<typeof View>> = [] || {};

    if (total > 1) {
      indexes = children.reduce((p, n, i) => {
        p.push(i);
        return p;
      }, []);

      indexes.unshift(total - 1);
      indexes.push(0);

      pages = indexes.map((page, i) => (
        <View key={i}>{children[page].component}</View>
      ));
    } else {
      pages = [<View key={0}>{children}</View>];
    }

    return (
      <View style={[styles.container]}>
        <ViewPagerAndroid
          ref={ref => (this.scrollView = ref)}
          {...this.props}
          initialPage={index}
          onPageSelected={this.onPageSelectedHandler}
          onPageScrollStateChanged={this.onPageScrollStateHandler}
          key={React.Children.count(indexes)}
          pageMargin={20}
          style={[styles.wrapperAndroid]}
        >
          {pages}
        </ViewPagerAndroid>

        {this.props.bullets && total > 1 ? (
          <Bullets
            index={index}
            total={total}
            calcIndexHandler={this.calcIndex}
          />
        ) : null}
        {this.props.arrows ? (
          <Arrows
            dimensions={this.dimensions}
            scrollByHandler={this.scrollBy}
          />
        ) : null}
      </View>
    );
  }
}

export default Carousel;

const styles = {
  container: {
    backgroundColor: "transparent",
    position: "relative",
    flex: 1,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  wrapperAndroid: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonWrapper: {
    backgroundColor: "transparent",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },

  buttonText: {
    fontSize: 150,
    color: "#007aff"
  }
};
