import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback } from 'react-native';
import Logo from '../../../assets/logo.svg';
import globalStyle from '../../../styles/globalStyle';
import { Container, IconBox } from './styles';

export default function Header() {
    const navigation = useNavigation();

    return (
        <Container>
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.dispatch(CommonActions.navigate('Home'));
                }}
            >
                <Logo
                    width={RFValue(115, 700)}
                    style={{
                        marginLeft: RFValue(16, 700),
                        marginBottom: RFValue(8, 700),
                    }}
                />
            </TouchableWithoutFeedback>

            <Container>
                <IconBox
                    onPress={() => {
                        navigation.dispatch(CommonActions.navigate('Historic'));
                    }}
                >
                    <Icon
                        name="list"
                        color={globalStyle.colors.secondary}
                        size={RFValue(25, 700)}
                        weight="bold"
                    />
                </IconBox>

                <IconBox
                    onPress={() => {
                        navigation.dispatch(CommonActions.navigate('NewCalc'));
                    }}
                >
                    <Icon
                        name="plus-circle"
                        color={globalStyle.colors.secondary}
                        size={RFValue(25, 700)}
                        weight="bold"
                    />
                </IconBox>

                <IconBox
                    onPress={() => {
                        navigation.dispatch(CommonActions.navigate('Settings'));
                    }}
                >
                    <Icon
                        name="settings"
                        color={globalStyle.colors.secondary}
                        size={RFValue(25, 700)}
                        weight="bold"
                    />
                </IconBox>
            </Container>
        </Container>
    );
}
