import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import globalStyle from '../../../styles/globalStyle';
import { Dimensions } from 'react-native';

type IProps = {
	error: boolean;
};

export const ContainerFields = styled.View`
	padding: ${RFValue(16, 700)}px;
	flex-grow: 1;
`;

export const ImageCorte = styled.Image`
	width: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
	height: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
	border-width: ${RFValue(2, 700)}px;
	border-color: ${globalStyle.colors.primary};
	border-radius: ${RFValue(8, 700)}px;
	margin-bottom: ${RFValue(16, 700)}px;
`;

export const SmallText = styled.Text`
	font-family: ${globalStyle.fonts.medium};
	font-size: ${RFValue(12, 700)}px;
	color: ${globalStyle.colors.primary};
`;

export const Title = styled.Text<IProps>`
	font-size: ${RFValue(18, 700)}px;
	font-family: ${globalStyle.fonts.bold};
	color: ${globalStyle.colors.primary};
	line-height: ${RFValue(23, 700)}px;
	margin-bottom: ${RFValue(8, 700)}px;

	${({ error }) =>
		error &&
		css`
			color: ${globalStyle.colors.error};
		`}
`;

export const ContainerModal = styled.View`
	padding: ${RFValue(16, 700)}px;
	min-height: ${RFValue(300, 700)}px;
	max-height: ${Dimensions.get('window').height * 0.75}px;
	max-width: ${RFValue(350, 700)}px;
	width: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
	background-color: ${globalStyle.colors.secondary};
	border-radius: ${RFValue(8, 700)}px;
`;

export const TextInfo = styled.Text`
	font-size: ${RFValue(18, 700)}px;
	font-family: ${globalStyle.fonts.semibold};
	color: ${globalStyle.colors.primary};
	text-align: justify;
	margin-bottom: ${RFValue(8, 700)}px;
`;