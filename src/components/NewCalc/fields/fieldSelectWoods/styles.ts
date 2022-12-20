import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import globalStyle from '../../../../styles/globalStyle';

type props = {
    error: boolean;
};

export const Title = styled.Text<props>`
    font-size: ${RFValue(18, 700)}px;
    font-family: ${globalStyle.fonts.bold};
    color: ${globalStyle.colors.primary};
    line-height: ${RFValue(23, 700)}px;
    margin-bottom: ${RFValue(8, 700)}px;

    ${({ error }) =>
        error &&
        css`
            color: ${globalStyle.colors.error};
        `}
`;
export const InputContainer = styled.View<props>`
    border-bottom-width: ${RFValue(1, 700)}px;
    border-color: ${globalStyle.colors.primary};
    flex-direction: row;
    align-items: center;
    padding-horizontal: ${RFValue(8, 700)}px;

    ${({ error }) =>
        error &&
        css`
            border-color: ${globalStyle.colors.error};
        `}
`;

export const Input = styled.TextInput`
    font-size: ${RFValue(17, 700)}px;
    font-family: ${globalStyle.fonts.medium};
    color: ${globalStyle.colors.primary};
    min-height: ${RFValue(32, 700)}px;
    margin: 0;
    padding-bottom: 10px;
    flex: 10;
    margin-bottom: -${RFValue(8, 700)}px;
`;

export const Dimension = styled.Text`
    font-size: ${RFValue(17, 700)}px;
    font-family: ${globalStyle.fonts.medium};
    color: ${globalStyle.colors.primary};
    flex: 1;
    text-align: right;
`;

export const Modal = styled.View`
    background-color: ${globalStyle.colors.secondary};
    border-radius: ${RFValue(8, 700)}px;
    padding: ${RFValue(16, 700)}px;
    height: ${RFValue(450, 700)}px;
    margin-horizontal: ${RFValue(32, 700)}px;
    width: ${RFValue(350, 700)}px;
`;

export const SelectText = styled.Text`
    font-size: ${RFValue(18, 700)}px;
    font-family: ${globalStyle.fonts.bold};
    color: ${globalStyle.colors.primary};
    padding-bottom: ${RFValue(16, 700)}px;
`;

export const ItemText = styled.Text`
    font-size: ${RFValue(17, 700)}px;
    font-family: ${globalStyle.fonts.medium};
    color: ${globalStyle.colors.primary};
    flex: 10;
    padding-left: ${RFValue(32, 700)}px;
`;

export const ItemSubText = styled.Text`
    font-size: ${RFValue(14, 700)}px;
    font-family: ${globalStyle.fonts.italic};
    color: ${globalStyle.colors.grey};
    flex: 10;
    padding-left: ${RFValue(32, 700)}px;
`;

export const ItemSelect = styled.View`
    padding: ${RFValue(8, 700)}px;
    min-height: ${RFValue(60, 700)}px;
    align-items: center;
    flex-direction: row;
    border-bottom-width: ${RFValue(2, 700)}px;
    border-color: ${globalStyle.colors.primary};
    border-style: dashed;
`;

export const Error = styled.Text`
    font-size: ${RFValue(12, 700)}px;
    font-family: ${globalStyle.fonts.medium};
    color: ${globalStyle.colors.error};
    line-height: ${RFValue(14, 700)}px;
    margin-top: ${RFValue(2, 700)}px;
`;

export const Space = styled.View`
    height: ${RFValue(16, 700)}px;
`;

export const Find = styled.View`
    height: ${RFValue(50, 700)}px;
    border-bottom-width: ${RFValue(1, 700)}px;
    border-color: ${globalStyle.colors.grey};
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${RFValue(16, 700)}px;
    align-items: center;
`;

export const FindInput = styled.TextInput`
    font-size: ${RFValue(18, 700)}px;
    font-family: ${globalStyle.fonts.semibold};
    color: ${globalStyle.colors.grey};
    flex: 1;
    padding: ${RFValue(8, 700)}px;
`;
