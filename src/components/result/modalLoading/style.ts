import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../../styles/globalStyle';

export const Container = styled.ImageBackground`
	height: 100%;
	width: 100%;
`;

export const TextLoading = styled.Text`
	font-size: ${RFValue(20, 700)}px;
	font-family: ${globalStyle.fonts.bold};
	color: ${globalStyle.colors.primary};
	text-align: center;
	margin-top: ${RFValue(32, 700)}px;
	margin-horizontal: ${RFValue(32, 700)}px;
`;