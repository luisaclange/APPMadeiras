import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../styles/globalStyle';

export const ButtonCleanFilter = styled.TouchableOpacity`
	border-width: ${RFValue(2, 700)}px;
	height: ${RFValue(60, 700)}px;
	border-color: ${globalStyle.colors.primary};
	border-radius: ${RFValue(8, 700)}px;
	border-style: dashed;
	align-items: center;
	justify-content: center;
	margin-bottom: ${RFValue(32, 700)}px;
`;

export const ButtonCleanText = styled.Text`
	font-family: ${globalStyle.fonts.bold};
	font-size: ${RFValue(18, 700)}px;
	color: ${globalStyle.colors.primary};
`;

export const Container = styled.View`
	padding: ${RFValue(16, 700)}px;
	flex-grow: 1;
`;

export const ContainerScroll = styled.ScrollView``;

export const ButtonsContainer = styled.View`
	padding: ${RFValue(16, 700)}px;
	justify-content: space-between;
	flex-direction: row;
`;
