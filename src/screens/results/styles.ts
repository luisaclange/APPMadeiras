import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../styles/globalStyle';

export const Container = styled.View`
	background-color: ${globalStyle.colors.secondary};
	flex: 1;
`;

export const ContainerButtons = styled.View`
	padding: ${RFValue(16, 700)}px;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`;

export const ContainerScroll = styled.ScrollView.attrs({
	contentContainerStyle: { flexGrow: 1 },
})`
	flex: 1;
`;

export const ContainerInfo = styled.View`
	padding: ${RFValue(16, 700)}px;
`;

export const TopContainerInfo = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${RFValue(16, 700)}px;
`;

export const TopContainerInfoLabel = styled.Text`
	font-family: ${globalStyle.fonts.bold};
	font-size: ${RFValue(18, 700)}px;
	color: ${globalStyle.colors.primary};
	flex: 3;
`;

export const TopContainerInfoItem = styled.View`
	padding: ${RFValue(8, 700)}px;
	background-color: ${globalStyle.colors.primary};
	border-radius: ${RFValue(8, 700)}px;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export const TopContainerInfoItemText = styled.Text`
	font-family: ${globalStyle.fonts.bold};
	font-size: ${RFValue(18, 700)}px;
	color: ${globalStyle.colors.secondary};
`;

export const TopContainerInfoUnity = styled.Text`
	font-family: ${globalStyle.fonts.semibold};
	font-size: ${RFValue(18, 700)}px;
	color: ${globalStyle.colors.primary};
	text-align: right;
	margin-left: ${RFValue(16, 700)}px;
`;

export const Line = styled.View`
	height: ${RFValue(2, 700)}px;
	border-radius: ${RFValue(1, 700)}px;
	background-color: ${globalStyle.colors.primary};
	margin-bottom: ${RFValue(16, 700)}px;
`;

export const TextInfoDefault = styled.Text`
	font-family: ${globalStyle.fonts.medium};
	font-size: ${RFValue(18, 700)}px;
	color: ${globalStyle.colors.primary};
	margin-left: ${RFValue(16, 700)}px;
`;

export const Space = styled.View`
	height: ${RFValue(16, 700)}px;
`;