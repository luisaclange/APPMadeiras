import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import globalStyle from '../../../../styles/globalStyle';

interface IProps {
	blackBorder: boolean;
}

export const Border = styled.View<IProps>`
	height: ${RFValue(60, 700)}px;
	border-width: ${RFValue(2, 700)}px;
	border-color: ${globalStyle.colors.secondary};
	padding: ${RFValue(2, 700)}px;
	border-radius: ${RFValue(8, 700)}px;
	width: 100%;
	min-width: ${RFValue(120, 700)}px;
	${({ blackBorder }) => blackBorder && css`
			background-color: ${globalStyle.colors.primary};
		`
	}
`;

export const Container = styled.View`
	background-color: ${globalStyle.colors.secondary};
	justify-content: center;
	align-items: center;
	margin: ${RFValue(2, 700)}px;
	flex-grow: 1;
	border-radius: ${RFValue(4, 700)}px;
`;

export const TextButton = styled.Text`
	font-family: ${globalStyle.fonts.semibold};
	color: ${globalStyle.colors.primary};
	font-size: ${RFValue(20, 700)}px;
	text-align: center;
`;
