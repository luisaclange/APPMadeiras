import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../styles/globalStyle';

export const Background = styled.ImageBackground`
	height: 100%;
`;

export const Container = styled.View`
	height: 100%;
	justify-content: space-between;
`;

export const ContainerText = styled.View`
	padding: 16px;
	padding-top: ${RFValue(180, 700)}px;
`;

export const ContainerButtons = styled.View`
	align-items: center;
	padding: ${RFValue(16, 700)}px;
`;

export const Description = styled.Text`
	font-family: ${globalStyle.fonts.regular};
	font-size: ${RFValue(18, 700)}px;
	color: ${globalStyle.colors.secondary};
`;
