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
  loop: boolean,
  arrows: boolean,
  bullets: boolean,
  loopTimer: number,
  margin: number
};

type State = {
  index: number,
  loopJump: boolean
};

class Carousel extends Component<Props, State> {
  static defaultProps = {
    loop: false,
    arrows: true,
    bullets: true,
    loopTimer: 5,
    margin: 0
  };

  scrollView: ViewPagerAndroid = null;
  state: State = this.initState();
  total: number = this.props.children ? this.props.children.length || 1 : 0;
  playerTimeOut: TimeoutID;
  currentRunningPageEndTimer: TimeoutID;
  playerTimeOutIsOn: boolean = false;
  dimensions: Object = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  };

  initState(): State {
    const { children } = this.props;
    return {
      index: 1,
      loopJump: false
    };
  }

  componentDidMount() {
    if (this.total > 1 && this.props.loop) this.loop();
  }

  componentWillUnmount() {
    clearTimeout(this.playerTimeOut);
  }

  onPageSelectedHandler = (e: Object): void => {
    this.calcIndex(e.nativeEvent.position);
  };

  onPageScrollStateHandler = (e: string): void => {
    const { loop, children } = this.props;

    switch (true) {
      case e === "dragging":
        this.playerTimeOutIsOn = false;
        clearTimeout(this.playerTimeOut);
        break;
      case e === "idle" && !this.playerTimeOutIsOn && loop:
        clearTimeout(this.currentRunningPageEndTimer);
        this.currentRunningPageEndTimer = setTimeout(() => {
          this.loop();
        }, parseInt(children[this.state.index - 1].attr.runningtime) * 1000);
        break;
    }
  };

  loop = (): void => {
    this.playerTimeOutIsOn = true;
    const { loopTimer, children } = this.props;
    const { index } = this.state;
    let nextChild = children[index === this.total ? 0 : index];

    let time =
      "attr" in nextChild
        ? parseInt(nextChild.attr.runningtime) * 1000
        : loopTimer * 1000;

    this.playerTimeOut = setTimeout(() => {
      clearTimeout(this.playerTimeOut);
      this.calcIndex(index + 1);
    }, time);
  };

  calcIndex = (i: number, animated: boolean = false): void => {
    let index: number = i;
    let loopJump: boolean = false;

    if (i <= 0) {
      index = this.total;
      loopJump = true;
    } else if (i > this.total) {
      index = 1;
      loopJump = true;
    }

    this.setState(
      { ...this.state, index, loopJump },
      (): void => this.loopJump(animated)
    );

    if (this.playerTimeOutIsOn) this.loop();
  };

  loopJump = (animated: boolean): void => {
    const { index, loopJump } = this.state;

    this.scrollView[!loopJump ? "setPage" : "setPageWithoutAnimation"](index);
  };

  scrollBy = (i: number): void => {
    const { index } = this.state;
    const newIndex: number = i + index;

    if (this.total < 2) return;

    this.calcIndex(newIndex, true);
  };

  pageType = (page: Array<number>, i: number): React$Element<typeof View> => {
    const { children } = this.props;
    const { index } = this.state;

    if (
      !React.isValidElement(children[page[0]]) &&
      children[page[0]].constructor === Object &&
      "attr" in children[page[0]]
    ) {
      console.log(
        page,
        index,
        page[1] === index,
        children[page[0]].attr.isVideo === true && page[1] !== index
      );

      return (
        <View key={i}>
          {children[page[0]].attr.isVideo === true && page[1] !== index ? (
            <View style={styles.videoNotLoaded} />
          ) : (
            children[page[0]].component
          )}
        </View>
      );
    } else {
      return <View key={i}>{children[page[0]]}</View>;
    }
  };

  render(): React$Node {
    const { children, margin, bullets, arrows } = this.props;
    const { index } = this.state;

    let indexes: Array<any> = [];
    let pages: Array<React$Element<typeof View>> = [] || {};

    // [[4, 0], [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6]]
    indexes = children.reduce((p, n, i) => {
      p.push(i);
      return p;
    }, []);

    indexes.unshift(this.total - 1);
    indexes.push(0);

    indexes = indexes.map((index, i) => [index, i]);

    console.log(indexes);
    pages = indexes.map((page, i) => this.pageType(page, i));
    return (
      <View style={[styles.container]}>
        <ViewPagerAndroid
          ref={ref => (this.scrollView = ref)}
          initialPage={index}
          onPageSelected={this.onPageSelectedHandler}
          onPageScrollStateChanged={this.onPageScrollStateHandler}
          key={React.Children.count(indexes)}
          pageMargin={margin}
          style={[styles.wrapperAndroid]}
        >
          {pages}
        </ViewPagerAndroid>

        {bullets && this.total > 1 ? (
          <Bullets
            index={index}
            total={this.total}
            calcIndexHandler={this.calcIndex}
          />
        ) : null}
        {arrows ? (
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

  videoNotLoaded: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#000000"
  }
};
