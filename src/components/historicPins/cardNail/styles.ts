import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../../styles/globalStyle';

export const ItemContainer = styled.TouchableOpacity`
	padding: ${RFValue(16, 700)}px;
	flex-direction: row;
	justify-content: space-between;
`;

export const ItemText = styled.Text`
	color: ${globalStyle.colors.primary};
	font-size: ${RFValue(16, 700)}px;
	font-family: ${globalStyle.fonts.semibold};
	margin-left: ${RFValue(16, 700)}px;
`;
