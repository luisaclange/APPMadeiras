import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../styles/globalStyle';
import { Dimensions, StatusBar } from 'react-native';

export const Container = styled.View`
	height: ${Dimensions.get('window').height + (Dimensions.get('screen').height - Dimensions.get('window').height - StatusBar.currentHeight)}px;
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

export const ButtonContainer = styled.View`
	padding: ${RFValue(16, 700)}px;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
`;

export const ContainerItems = styled.View`
	padding: ${RFValue(16, 700)}px;
	flex: 1
`;

export const Space = styled.View`
	height: ${RFValue(16, 700)}px;
`;

export const Modal = styled.View`
	padding: ${RFValue(16, 700)}px;
	border-radius: ${RFValue(8, 700)}px;
`;