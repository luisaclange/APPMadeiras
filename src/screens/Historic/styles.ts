import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../styles/globalStyle';

export const Container = styled.View`
	position: relative;
`;

export const FloatingButton = styled.View`
	position: absolute;
	bottom: ${RFValue(60, 700)}px;
	right: ${RFValue(16, 700)}px;
`;

export const TextAlert = styled.Text`
	font-size: ${RFValue(28, 700)}px;
	text-align: center;
	font-family: ${globalStyle.fonts.bold};
	color: ${globalStyle.colors.primary};
`;

export const BoxAlert = styled.View`
	margin-top: ${RFValue(100, 700)}px;
`;
