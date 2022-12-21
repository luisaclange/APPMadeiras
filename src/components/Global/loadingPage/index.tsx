import React from "react";
import { ActivityIndicator } from "react-native";
import globalStyle from "../../../styles/globalStyle";

export default function LoadingPage() {
  return (
    <ActivityIndicator
      color={globalStyle.colors.primary}
      size="large"
      style={{ marginTop: 100 }}
    />
  )
}