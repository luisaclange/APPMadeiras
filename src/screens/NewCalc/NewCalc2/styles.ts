import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import globalStyle from "../../../styles/globalStyle";
import { Dimensions } from "react-native";

export const ContainerFields = styled.View`
  padding: ${RFValue(16, 700)}px;
  flex-grow: 1;
`;

export const Container = styled.View`
  background-color: ${globalStyle.colors.secondary};
  height: 100%;
`;

export const ImageCorte = styled.Image`
  width: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
  height: ${Dimensions.get('screen').width - RFValue(32, 700)}px;
  border-width: ${RFValue(2, 700)}px;
  border-color: ${globalStyle.colors.primary};
  border-radius: ${RFValue(8, 700)}px;
`;