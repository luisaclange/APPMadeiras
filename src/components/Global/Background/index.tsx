import React, { Component } from "react";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Image } from "./styles";

interface props {
    children: React.ReactNode;
}

export const Background: React.FC<props> = ({ children }) => {
    return (
        <Image
            source={require('../../../assets/Background.png')}
            imageStyle={{ marginTop: RFValue(120, 700), height: Dimensions.get('screen').height - RFValue(120, 700) }}
        >
            {children}
        </Image>
    )
}
