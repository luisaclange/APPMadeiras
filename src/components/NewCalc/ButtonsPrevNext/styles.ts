import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    padding: ${RFValue(16, 700)}px;
    padding-bottom: ${RFValue(100, 700)}px;
    flex-direction: row;
`;
