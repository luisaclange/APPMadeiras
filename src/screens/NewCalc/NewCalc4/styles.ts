import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import globalStyle from "../../../styles/globalStyle";

export const TextWood = styled.Text`
    font-size: ${RFValue(20, 700)}px;
    font-family: ${globalStyle.fonts.medium};
    color: ${globalStyle.colors.primary};
    line-height: ${RFValue(23, 700)}px;
    margin-vertical: ${RFValue(32, 700)}px;
`;
