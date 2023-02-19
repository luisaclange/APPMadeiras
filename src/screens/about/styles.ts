import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../styles/globalStyle';
import { Dimensions } from 'react-native';

export const Container = styled.View`
	padding: ${RFValue(16, 700)}px;
	flex-grow: 1;
`;

export const ContainerScroll = styled.ScrollView``;

export const Title = styled.Text`
	text-align: center;
	font-family: ${globalStyle.fonts.bold};
	font-size: ${RFValue(24, 700)}px;
	color: ${globalStyle.colors.primary};
	margin-bottom: ${RFValue(8, 700)}px;
`;

export const Subtitle = styled.Text`
	text-align: center;
	font-family: ${globalStyle.fonts.semibold};
	font-size: ${RFValue(18, 700)}px;
	color: ${globalStyle.colors.primary};
	margin-bottom: ${RFValue(32, 700)}px;
`;

export const TextInfo = styled.Text`
	text-align: justify;
	font-family: ${globalStyle.fonts.medium};
	font-size: ${RFValue(16, 700)}px;
	color: ${globalStyle.colors.primary};
	margin-bottom: ${RFValue(16, 700)}px;
`;

export const TextContact = styled.Text`
	text-align: center;
	font-family: ${globalStyle.fonts.semibold};
	font-size: ${RFValue(16, 700)}px;
	color: ${globalStyle.colors.primary};
	margin-bottom: ${RFValue(8, 700)}px;
`;

export const ButtonContainer = styled.View`
	padding: ${RFValue(16, 700)}px;
`;

export const ImageCorte = styled.Image`
	width: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
	height: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
	border-width: ${RFValue(2, 700)}px;
	border-color: ${globalStyle.colors.primary};
	border-radius: ${RFValue(8, 700)}px;
	margin-bottom: ${RFValue(16, 700)}px;
`;

