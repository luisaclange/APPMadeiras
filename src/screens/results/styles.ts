import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import globalStyle from "../../styles/globalStyle";

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
  contentContainerStyle: { flexGrow: 1 }
})`
  flex: 1;
`;

export const ContainerInfo = styled.View`
  padding: ${RFValue(16, 700)}px;
`;

