import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../../../styles/globalStyle';
import { Dimensions } from 'react-native';

export const Container = styled.View`
	padding: ${RFValue(16, 700)}px;
	height: ${RFValue(300, 700)}px;
	max-width: ${RFValue(350, 700)}px;
	width: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
	background-color: ${globalStyle.colors.secondary};
	border-radius: ${RFValue(8, 700)}px;
`;

export const Message = styled.Text`
	color: ${globalStyle.colors.primary};
	font-family: ${globalStyle.fonts.semibold};
	font-size: ${RFValue(22, 700)}px;
	text-align: center;
`;

export const MessageContainer = styled.View`
	flex-grow: 1;
	align-items: center;
	justify-content: center;
`;
