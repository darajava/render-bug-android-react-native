import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fbfbfb",
  },
  sidePanel: {
    width: Dimensions.get("window").width * 0.7,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
  mainContent: {
    width: Dimensions.get("window").width,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
  sidePanelContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    padding: 15,
    flex: 1,
    backgroundColor: "hotpink",
  },
  testContainer: {
    // width: ,
    display: "flex",
    flexDirection: "row",
  },
});

const SidePanel: React.FC = () => {
  return (
    <View style={styles.sidePanelContainer}>
      <Text>HIDDEN</Text>
    </View>
  );
};

//@ts-ignore
const Item = ({ transform, toggleOrdersOpen }) => {
  return (
    <Animated.View
      style={[
        styles.testContainer,
        {
          transform: [
            {
              translateX: transform,
            },
          ],
        },
      ]}
    >
      <View style={styles.mainContent}>
        <Pressable onPress={toggleOrdersOpen}>
          <Text>Visible, click me to see a horribly delayed animation</Text>
        </Pressable>
      </View>
      <View style={styles.sidePanel}>
        <SidePanel />
      </View>
    </Animated.View>
  );
};

export default function App() {
  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(false);

  const [slideAnim, setSlideAnim] = useState(new Animated.Value(0));
  const [toValue, setToValue] = useState(0);

  const duration = 200;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();

    // Enable following line and remove preceeding line to remove animation.
    // I have also tried using no animations whatsoever (just numbers for translation)
    // And it still has the same delay

    // slideAnim.setValue(toValue)
  }, [slideAnim]);

  const sidePanelWidth = Dimensions.get("window").width * 0.7;

  const openSidePanel = () => {
    setToValue(-sidePanelWidth);
    setSlideAnim(new Animated.Value(0));
  };

  const closeSidePanel = () => {
    setToValue(0);
    setSlideAnim(new Animated.Value(-sidePanelWidth));
  };

  const setSidePanelState = () => {
    if (sidePanelOpen) {
      openSidePanel();
    } else {
      closeSidePanel();
    }
  };

  useEffect(() => {
    setSidePanelState();
  }, [sidePanelOpen]);

  return (
    <>
      <ScrollView style={styles.container}>
        {Array.from(Array(100)).map((_, i) => {
          return (
            <Item
              transform={slideAnim}
              key={i}
              toggleOrdersOpen={() => {
                setSidePanelOpen(!sidePanelOpen);
              }}
            />
          );
        })}
      </ScrollView>
    </>
  );
}
