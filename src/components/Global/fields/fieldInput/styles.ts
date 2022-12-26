import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import globalStyle from '../../../../styles/globalStyle';

type IProps = {
  error: boolean;
};

export const Title = styled.Text <IProps>`
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
export const InputContainer = styled.View<IProps>`
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
    height: ${RFValue(32, 700)}px;
    margin: 0;
    padding: 0;
    flex: 8;
`;

export const Dimension = styled.Text<IProps>`
    font-size: ${RFValue(17, 700)}px;
    font-family: ${globalStyle.fonts.medium};
    color: ${globalStyle.colors.primary};
    flex: 1;
    text-align: right;

    ${({ error }) =>
    error &&
    css`
            color: ${globalStyle.colors.error};
        `}
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
