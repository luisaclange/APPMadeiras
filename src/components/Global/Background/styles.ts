import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Image = styled.ImageBackground`
    height: ${Dimensions.get('screen').height}px;
`;
