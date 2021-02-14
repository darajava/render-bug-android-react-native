import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  mainContent: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
  testContainer: {
    // width: ,
    display: "flex",
    flexDirection: "row",
  },
});

//@ts-ignore
const Item = ({ toggleOrdersOpen, val }) => {
  return (
    <View style={styles.testContainer}>
      <View style={styles.mainContent}>
        <Pressable onPress={toggleOrdersOpen}>
          <Text>Visible, click me to see a lot of lag {val}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default function App() {
  const getValues = () => {
    const arr: any = [];

    for (let i = 0; i < 1000; i++) {
      arr.push(Math.random());
    }

    return arr;
  };

  const [values, setValues] = useState<any>(getValues());

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {Array.from(Array(500)).map((_, i) => {
          return (
            <Item
              key={i}
              val={values[i]}
              toggleOrdersOpen={() => {
                setValues(getValues());
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
