import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import globalStyle from "../../../styles/globalStyle";
import { ProgressNewCalc } from "../header";

interface IProps {
  status: ProgressNewCalc;
}

export const Container = styled.View`
    padding: ${RFValue(16, 700)}px;
`;

export const BorderBar = styled.View`
    border-width: ${RFValue(2, 700)}px;
    border-color: ${globalStyle.colors.secondary};
    padding: ${RFValue(2, 700)}px;
    border-radius: ${RFValue(8, 700)}px;
`;

export const Progress = styled.View<IProps>`
    height: ${RFValue(10, 700)}px;
    background-color: ${globalStyle.colors.secondary};
    border-radius: ${RFValue(8, 700)}px;

    ${({ status }) => status === ProgressNewCalc.newCalc1 && css`
            width: ${RFValue(8.5, 700)}px;
        `
  }

    ${({ status }) => status === ProgressNewCalc.newCalc2 && css`
            width: ${(RFValue(12.5, 700)) + (Dimensions.get('window').width - RFValue(57, 700)) * (1 / 2)}px;
        `
  }
`;

export const BorderItem = styled.View`
    border-width: ${RFValue(2, 700)}px;
    border-color: ${globalStyle.colors.secondary};
    padding: ${RFValue(2, 700)}px;
    border-radius: ${RFValue(13, 700)}px;
    width: ${RFValue(25, 700)}px;
    height: ${RFValue(25, 700)}px;
`;

export const Item = styled.View`
    background-color: ${globalStyle.colors.secondary};
    justify-content: center;
    align-items: center;
    border-radius: ${RFValue(8, 700)}px;
    height: ${RFValue(17, 700)}px;
`;

export const ItemsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${RFValue(16, 700)}px;
`;

export const TextItem = styled.Text`
    font-size: ${RFValue(14, 700)}px;
    font-family: ${globalStyle.fonts.bold};
    color: ${globalStyle.colors.primary};
    line-height: ${RFValue(19, 700)}px;
`;
