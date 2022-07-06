import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import globalStyle from "../../../styles/globalStyle";

export const Container = styled.View`
    padding: ${RFValue(16, 700)}px;
`;

export const Border = styled.View`
    border-width: ${RFValue(2, 700)}px;
    border-color: ${globalStyle.colors.secondary};
    padding: ${RFValue(2, 700)}px;
    border-radius: ${RFValue(8, 700)}px;
`;

export const FieldsContainer = styled.View`
    background-color: ${globalStyle.colors.secondary};
    border-radius: ${RFValue(8, 700)}px;
    padding: ${RFValue(16, 700)}px;
`;
