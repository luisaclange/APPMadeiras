import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import globalStyle from "../../../styles/globalStyle";

export const ContainerFields = styled.View`
  padding: ${RFValue(16, 700)}px;
  flex-grow: 1;
`;

export const Container = styled.View`
  background-color: ${globalStyle.colors.secondary};
  height: 100%;
`;