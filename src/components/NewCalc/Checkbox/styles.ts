import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import globalStyle from "../../../styles/globalStyle";

interface props {
    isMarked: boolean;
}

export const Title = styled.Text`
    font-size: ${RFValue(18, 700)}px;
    font-family: ${globalStyle.fonts.bold};
    color: ${globalStyle.colors.primary};
    line-height: ${RFValue(23, 700)}px;
    margin-bottom: ${RFValue(8, 700)}px;
`;

export const Item = styled.View`
    flex-direction: row;
    margin-bottom: ${RFValue(8, 700)}px;
    align-items: center;
    min-height: ${RFValue(30, 700)}px;
`;

export const MarkButton = styled.View<props>`
    border-radius: ${RFValue(10, 700)}px;
    width: ${RFValue(16, 700)}px;
    height: ${RFValue(16, 700)}px;
    border-width: ${RFValue(2, 700)}px;
    border-color: ${globalStyle.colors.primary};
    margin-right: ${RFValue(16, 700)}px;

    ${({ isMarked }) => isMarked && css`
        background-color: ${globalStyle.colors.primary};
    `}
`;

export const ItemText = styled.Text`
    font-size: ${RFValue(18, 700)}px;
    font-family: ${globalStyle.fonts.medium};
    color: ${globalStyle.colors.primary};
    line-height: ${RFValue(23, 700)}px;
`;
