import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../../styles/globalStyle';

export const Container = styled.View`
    background-color: ${globalStyle.colors.primary}
    height: ${RFValue(120, 700)}px;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between
`;

export const IconBox = styled.TouchableOpacity`
    height: ${RFValue(60, 700)}px;
    width: ${RFValue(60, 700)}px;
    justify-content: center;
    align-items: center;
`;
