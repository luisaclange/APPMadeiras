import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import globalStyle from "../../styles/globalStyle";

export const TextAlert = styled.Text`
    font-size: ${RFValue(28, 700)}px;
    text-align: center;
    font-family: ${globalStyle.fonts.bold};
    color: ${globalStyle.colors.primary};
`;

export const BoxAlert = styled.View`
    margin-top: ${RFValue(100, 700)}px;
`;
