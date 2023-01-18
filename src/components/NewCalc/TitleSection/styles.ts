import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../../styles/globalStyle';

export const Container = styled.View`
	padding: ${RFValue(16, 700)}px;
	align-items: center;
`;

export const Title = styled.Text`
	font-size: ${RFValue(24, 700)}px;
	font-family: ${globalStyle.fonts.bold};
	color: ${globalStyle.colors.primary};
	line-height: ${RFValue(40, 700)}px;
`;

export const SubTitle = styled.Text`
	font-size: ${RFValue(18, 700)}px;
	font-family: ${globalStyle.fonts.regular};
	color: ${globalStyle.colors.primary};
	line-height: ${RFValue(24, 700)}px;
	text-align: center;
`;
