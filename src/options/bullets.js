/**
 * @flow
 */

import React from "react";
import { View, TouchableOpacity } from "react-native";

type Props = {
  index: number,
  total: number,
  calcIndexHandler: Function
};
const bullets: React$StatelessFunctionalComponent<Props> = (
  props: Props
): React$Element<typeof View> => {
  const { index, total } = props;
  let dots: Array<React$Element<typeof TouchableOpacity>> = [];

  for (let i = 1; i <= total; i++) {
    const dot: React$Element<typeof TouchableOpacity> = (
      <TouchableOpacity onPress={() => props.calcIndexHandler(i, true)}>
        <View
          style={[
            styles.bullets,
            {
              backgroundColor:
                i === index ? "rgba(0,0,0,.2)" : "rgba(220,220,220,.5)"
            }
          ]}
        />
      </TouchableOpacity>
    );

    dots.push(React.cloneElement(dot, { key: i }));
  }

  return <View style={styles.container}>{dots}</View>;
};
export default bullets;

const styles = {
  container: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  bullets: {
    width: 20,
    height: 20,
    borderRadius: 20,
    margin: 20
  }
};
