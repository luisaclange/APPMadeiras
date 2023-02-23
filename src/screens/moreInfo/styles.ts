import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import globalStyle from '../../styles/globalStyle';
import { Dimensions } from 'react-native';

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

export const ContainerInfo = styled.View`
	padding: ${RFValue(16, 700)}px;
`;

export const ContainerScroll = styled.ScrollView.attrs({
	contentContainerStyle: { flexGrow: 1 },
})`
	flex: 1;
`;

export const ContainerUnity = styled.View`
	padding-horizontal: ${RFValue(16, 700)}px;
	padding-vertical: ${RFValue(8, 700)}px;
	border-width: ${RFValue(2, 700)}px;
	border-color: ${globalStyle.colors.primary};
	border-radius: ${RFValue(8, 700)}px;
	margin-bottom: ${RFValue(32, 700)}px;
`;

export const ImageCorte = styled.Image`
	width: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
	height: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
	border-width: ${RFValue(2, 700)}px;
	border-color: ${globalStyle.colors.primary};
	border-radius: ${RFValue(8, 700)}px;
	margin-bottom: ${RFValue(16, 700)}px;
`;

export const ItemUnity = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-vertical: ${RFValue(8, 700)}px;
`;

export const Label = styled.Text`
	color: ${globalStyle.colors.primary};
	font-family: ${globalStyle.fonts.bold};
	font-size: ${RFValue(18, 700)}px;
	margin-bottom: ${RFValue(8, 700)}px;
	padding-left: ${RFValue(16, 700)}px;
`;

export const Line = styled.View`
	height: ${RFValue(2, 700)}px;
	background-color: ${globalStyle.colors.primary};
	margin-vertical: ${RFValue(32, 700)}px;
`;

export const Subtitle = styled.Text`
	color: ${globalStyle.colors.primary};
	font-family: ${globalStyle.fonts.bold};
	font-size: ${RFValue(24, 700)}px;
	margin-bottom: ${RFValue(32, 700)}px;
`;

export const TextUnity = styled.Text`
	color: ${globalStyle.colors.primary};
	font-family: ${globalStyle.fonts.bold};
	font-size: ${RFValue(18, 700)}px;
`;

export const TextValueUnity = styled.Text`
	color: ${globalStyle.colors.secondary};
	font-family: ${globalStyle.fonts.bold};
	font-size: ${RFValue(18, 700)}px;
`;

export const Title = styled.Text`
	color: ${globalStyle.colors.primary};
	font-family: ${globalStyle.fonts.bold};
	font-size: ${RFValue(28, 700)}px;
	text-align: center;
`;

export const ValueInfo = styled.Text`
	color: ${globalStyle.colors.primary};
	font-family: ${globalStyle.fonts.medium};
	font-size: ${RFValue(18, 700)}px;
	margin-bottom: ${RFValue(16, 700)}px;
	padding-left: ${RFValue(32, 700)}px;
`;

export const ValueUnity = styled.View`
	width: ${RFValue(50, 700)}px;
	height: ${RFValue(50, 700)}px;
	background-color: ${globalStyle.colors.primary};
	flex: 1;
	border-radius: ${RFValue(8, 700)}px;
	align-items: center;
	justify-content: center;
`;
