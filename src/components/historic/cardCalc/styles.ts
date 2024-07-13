import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import globalStyle from '../../../styles/globalStyle';

interface IProps {
	isNew: boolean;
}

export const Container = styled.Pressable<IProps>`
	background-color: ${globalStyle.colors.secondary};
	padding: ${RFValue(16, 700)}px;
	border-radius: ${RFValue(8, 700)}px;
	elevation: 10;
	flex-direction: row;
	margin-bottom: ${RFValue(16, 700)}px;
	position: relative;
	min-height: ${RFValue(250, 700)}px;

	${({ isNew }) =>
		isNew &&
		css`
			border-width: ${RFValue(5, 700)}px;
			border-color: ${globalStyle.colors.yellow};
			padding: ${RFValue(11, 700)}px;
		`}
`;

export const IconsContainer = styled.View`
	flex: 1;
	align-items: flex-end;
	justify-content: space-between;
`;

export const InfoContainer = styled.View`
	flex: 4;
`;

export const ItemText = styled.Text`
	font-size: ${RFValue(16, 700)}px;
	font-family: ${globalStyle.fonts.medium};
	line-height: ${RFValue(24, 700)}px;
`;

export const SubTitle = styled.Text`
	font-size: ${RFValue(16, 700)}px;
	font-family: ${globalStyle.fonts.semibold};
	color: ${globalStyle.colors.grey};
`;

export const TextContainer = styled.View`
	padding: ${RFValue(12, 700)}px;
	padding-bottom: 0px;
`;

export const Title = styled.Text`
	font-size: ${RFValue(28, 700)}px;
	font-family: ${globalStyle.fonts.semibold};
	color: ${globalStyle.colors.primary};
`;
