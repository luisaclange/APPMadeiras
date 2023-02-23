import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ButtonContainer = styled.View`
	padding: ${RFValue(16, 700)}px;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
`;

export const ContainerItems = styled.View`
	padding: ${RFValue(16, 700)}px;
	flex: 1
`;

export const Modal = styled.View`
	padding: ${RFValue(16, 700)}px;
	border-radius: ${RFValue(8, 700)}px;
	background-color: white;
`;

export const Space = styled.View`
	height: ${RFValue(16, 700)}px;
`;
