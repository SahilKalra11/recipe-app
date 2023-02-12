import React from "react";
import { TextInput as RNTextInput } from "react-native";

import { View } from "./View";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { Colors } from "../config";

export const TextInput = ({
  width = "100%",
  leftIconName,
  rightIcon,
  handlePasswordVisibility,
  ...otherProps
}) => {
  return (
    <View
      style={{
        borderRadius: 30,
        flexDirection: "row",
        padding: 20,
        marginVertical: 12,
        width,
        borderWidth: 0,
        borderColor: Colors.mediumGray,
        elevation: 10,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "#fff",
      }}
    >
      {leftIconName ? (
        <Icon
          name={leftIconName}
          size={25}
          color={Colors.black}
          style={{ marginRight: 10 }}
        />
      ) : null}
      <RNTextInput
        style={{
          flex: 1,
          width: "100%",
          fontSize: 18,
          color: Colors.black,
        }}
        placeholderTextColor={Colors.mediumGray}
        {...otherProps}
      />
      {rightIcon ? (
        <Button onPress={handlePasswordVisibility}>
          <Icon
            name={rightIcon}
            size={25}
            color={Colors.black}
            style={{ marginRight: 10 }}
          />
        </Button>
      ) : null}
    </View>
  );
};
