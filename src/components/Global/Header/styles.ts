import { RFValue } from 'react-native-responsive-fontsize';
import globalStyle from '../../../styles/globalStyle';
import styled, { css } from 'styled-components/native';


type Props = {
    focused: boolean
}

export const Container = styled.View`
    background-color: ${globalStyle.colors.primary}
    height: ${RFValue(120, 700)}px;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between
`;

export const IconBox = styled.TouchableOpacity<Props>`
    height: ${RFValue(60, 700)}px;
    width: ${RFValue(60, 700)}px;
    justify-content: center;
    align-items: center;

    ${({ focused }) => focused && css`
        border-bottom-width: 2px;
        border-color: white;
    `}
`;
