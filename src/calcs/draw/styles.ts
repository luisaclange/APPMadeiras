import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../styles/globalStyle';

export const ContainerDraw = styled.View`
	width: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
	height: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
	border-width: ${RFValue(2, 700)}px;
	border-radius: ${RFValue(8, 700)}px;
	border-color: ${globalStyle.colors.primary};
	justify-content: center;
	align-items: center;
	margin-bottom: ${RFValue(16, 700)}px;
	padding: ${RFValue(8, 700)}px;
`;

export const ContainerCapture = styled.View`
	align-items: center;
	width: 100%;
	height: 100%;
	justify-content: center;
`;