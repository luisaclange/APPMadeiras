import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../../styles/globalStyle';

export const Container = styled.View`
	padding: ${RFValue(16, 700)}px;
	flex-grow: 1;
`;

export const ContainerButton = styled.View`
	padding: ${RFValue(16, 700)}px;
	flex-direction: row;
	justify-content: space-between;
`;

export const ImagePin = styled.Image`
	width: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
	border-radius: ${RFValue(8, 700)}px;
	border-width: ${RFValue(1, 700)}px;
	border-color: ${globalStyle.colors.primary};
	margin-bottom: ${RFValue(16, 700)}px;
`;
