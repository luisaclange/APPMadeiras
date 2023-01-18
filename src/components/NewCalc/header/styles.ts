import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../../styles/globalStyle';

export const Container = styled.ImageBackground`
	height: ${RFValue(180, 700)}px;
	position: relative;
`;

export const Shadow = styled.View`
	background-color: ${globalStyle.colors.primary};
	flex: 1;
`;

export const ItensContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

export const Title = styled.Text`
	font-size: ${RFValue(28, 700)}px;
	color: ${globalStyle.colors.secondary};
	font-family: ${globalStyle.fonts.bold};
	text-align: center;
`;

export const IconContainer = styled.View`
	width: ${RFValue(40, 700)}px;
`;
