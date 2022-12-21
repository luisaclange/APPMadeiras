import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import globalStyle from "../../../styles/globalStyle";

interface props {
  isNew: boolean;
}

export const Container = styled.View<props>`
    background-color: ${globalStyle.colors.secondary};
    padding: ${RFValue(16, 700)}px;
    border-radius: ${RFValue(8, 700)}px;
    elevation: 10;
    flex-direction: row;
    margin-bottom: ${RFValue(16, 700)}px;
    position: relative;

    ${({ isNew }) => isNew && css`
        border-width: ${RFValue(5, 700)}px;
        border-color: #FFE600;
        padding: ${RFValue(11, 700)}px;
    `}
`;

export const Title = styled.Text`
    font-size: ${RFValue(28, 700)}px;
    font-family: ${globalStyle.fonts.semibold};
    color: ${globalStyle.colors.primary};
`;

export const SubTitle = styled.Text`
    font-size: ${RFValue(16, 700)}px;
    font-family: ${globalStyle.fonts.semibold};
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
