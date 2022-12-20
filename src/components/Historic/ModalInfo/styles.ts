import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../../styles/globalStyle';

export const Container = styled.View`
    margin-horizontal: ${RFValue(16, 700)}px;
    border-radius: ${RFValue(8, 700)}px;
    background-color: ${globalStyle.colors.secondary};
    padding: ${RFValue(16, 700)}px;
    width: ${RFValue(350, 700)}px;
`;

export const TextInfo = styled.Text`
    font-size: ${RFValue(14, 700)}px;
    font-family: ${globalStyle.fonts.semibold};
    color: ${globalStyle.colors.primary};
`;
