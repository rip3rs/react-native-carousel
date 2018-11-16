/**
 * @flow
 */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  dimensions: Object,
  scrollByHandler: Function
};
const arrows: React$StatelessFunctionalComponent<Props> = (
  props: Props
): React$Element<typeof View> => {
  const { scrollByHandler } = props;
  const { width, height } = props.dimensions;

  let button: React$Element<typeof TouchableOpacity>[] = [
    <TouchableOpacity
      style={[styles.buttonContainer, { paddingRight: 100 }]}
      key={0}
      onPress={() => scrollByHandler(-1)}
    >
      <Text style={[styles.buttonText]}>‹</Text>
    </TouchableOpacity>,
    <TouchableOpacity
      style={[styles.buttonContainer, { paddingLeft: 100 }]}
      key={1}
      onPress={() => scrollByHandler(1)}
    >
      <Text style={styles.buttonText}>›</Text>
    </TouchableOpacity>
  ];

  return (
    <View
      pointerEvents="box-none"
      style={[styles.container, { width: width, height: height }]}
    >
      {button}
    </View>
  );
};
export default arrows;

const styles = {
  container: {
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
  buttonContainer: {
    height: "100%",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 100,
    color: "rgba(220,220,220,1)",
    opacity: 0.4
  }
};
