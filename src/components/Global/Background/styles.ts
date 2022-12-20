import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Image = styled.ImageBackground`
    height: ${RFValue(600, 700) +
    Dimensions.get('screen').height -
    Dimensions.get('window').height}px;
`;
