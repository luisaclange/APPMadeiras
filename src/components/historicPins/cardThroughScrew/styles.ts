import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../../styles/globalStyle';

export const TitleButtonContainer = styled.TouchableHighlight`
	border-radius: ${RFValue(8, 700)}px;
	border-width: ${RFValue(2, 700)}px;
	border-style: dashed;
	border-color: ${globalStyle.colors.primary};
	padding: ${RFValue(16, 700)}px;
`;

export const TitleButtonText = styled.Text`
	color: ${globalStyle.colors.primary};
	font-size: ${RFValue(18, 700)}px;
	font-family: ${globalStyle.fonts.bold};
`;

export const ScrollItems = styled.ScrollView`
`;

export const ItemContainer = styled.TouchableOpacity`
	padding: ${RFValue(16, 700)}px;
	justify-content: space-between;
`;

export const ItemText = styled.Text`
	color: ${globalStyle.colors.primary};
	font-size: ${RFValue(14, 700)}px;
	font-family: ${globalStyle.fonts.semibold};
`;