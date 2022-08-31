import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import globalStyle from "../../../styles/globalStyle";

export const Container = styled.View`
    background-color: ${globalStyle.colors.secondary};
    padding: ${RFValue(16, 700)}px;
    border-radius: ${RFValue(8, 700)}px;
    elevation: 10;
    flex-direction: row;
    margin-bottom: ${RFValue(16, 700)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(24, 700)}px;
    font-family: ${globalStyle.fonts.bold};
    color: ${globalStyle.colors.primary};
`;

export const SubTitle = styled.Text`
    font-size: ${RFValue(14, 700)}px;
    font-family: ${globalStyle.fonts.medium};
    color: ${globalStyle.colors.grey};
`;

export const ItemText = styled.Text`
    font-size: ${RFValue(16, 700)}px;
    font-family: ${globalStyle.fonts.medium};
    line-height: ${RFValue(24, 700)}px;
`;

export const TextContainer = styled.View`
    padding: ${RFValue(12, 700)}px;
    padding-bottom: 0px;
`;

export const InfoContainer = styled.View`
    flex: 4;
`;

export const IconsContainer = styled.View`
    flex: 1;
    align-items: flex-end;
    justify-content: space-between;
`;
