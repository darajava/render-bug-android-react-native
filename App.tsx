import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

const styles = StyleSheet.create({
  sidePanel: {
    width: Dimensions.get("window").width * 0.7,
    borderBottomWidth: 1,
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
    <View
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
          <Text>Visible, click me to see a lot of lag</Text>
        </Pressable>
      </View>
      <View style={styles.sidePanel}>
        <SidePanel />
      </View>
    </View>
  );
};

export default function App() {
  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
  const [sidePosition, setSidePosition] = useState(0);

  const sidePanelWidth = Dimensions.get("window").width * 0.7;

  const openSidePanel = () => {
    setSidePosition(0);
  };

  const closeSidePanel = () => {
    setSidePosition(-sidePanelWidth);
  };

  useEffect(() => {
    if (sidePanelOpen) {
      openSidePanel();
    } else {
      closeSidePanel();
    }
  }, [sidePanelOpen]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {Array.from(Array(200)).map((_, i) => {
          return (
            <Item
              transform={sidePosition}
              key={i}
              toggleOrdersOpen={() => {
                setSidePanelOpen(!sidePanelOpen);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
