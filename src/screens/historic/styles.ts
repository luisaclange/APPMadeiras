import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../styles/globalStyle';

export const BoxAlert = styled.View`
	margin-top: ${RFValue(100, 700)}px;
	align-items: center;
	padding-horizontal: ${RFValue(32, 700)}px;
`;

export const Container = styled.View`
	position: relative;
	height: 100%;
`;

export const FloatingButton = styled.View`
	position: absolute;
	bottom: ${RFValue(60, 700)}px;
	right: ${RFValue(16, 700)}px;
`;

export const TextAlert = styled.Text`
	font-size: ${RFValue(24, 700)}px;
	text-align: center;
	font-family: ${globalStyle.fonts.bold};
	color: ${globalStyle.colors.primary};
	margin-top: ${RFValue(32, 700)}px;
`;
