import React, { Component } from "react";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Image } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import globalStyle from "../../../styles/globalStyle";

interface props {
    children: React.ReactNode;
}

export const Background: React.FC<props> = ({ children }) => {
    return (
        <LinearGradient
            colors={['#593b2b', 'transparent', 'transparent', 'transparent', '#593b2b']}
            style={{ height: '100%' }}
        >
            {children}
        </LinearGradient>
        // <Image
        //     source={require('../../../assets/Background.png')}
        //     imageStyle={{ height: Dimensions.get('screen').height - RFValue(120, 700) }}
        // >
        //     {children}
        // </Image>
    )
}
