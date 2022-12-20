import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../../../styles/globalStyle';

export const Border = styled.View`
    height: ${RFValue(60, 700)}px;
    border-width: ${RFValue(2, 700)}px;
    border-color: ${globalStyle.colors.primary};
    background-color: ${globalStyle.colors.secondary};
    padding: ${RFValue(0.5, 700)}px;
    border-radius: ${RFValue(8, 700)}px;
    width: 100%;
    min-width: ${RFValue(120, 700)}px;
`;

export const Container = styled.View`
    background-color: ${globalStyle.colors.primary};
    justify-content: center;
    align-items: center;
    margin: 2px;
    flex-grow: 1;
    border-radius: ${RFValue(8, 700)}px;
`;

export const TextButton = styled.Text`
    font-family: ${globalStyle.fonts.bold};
    color: ${globalStyle.colors.secondary};
    font-size: ${RFValue(20, 700)}px;
`;
