import React from "react";
import { Container, IconBox } from "./styles";
import globalStyle from "../../../styles/globalStyle";
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from "@react-navigation/native";
import Logo from '../../../assets/logo.svg';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
    screen: string;
}

export const Header: React.FC<Props> = ({ screen }) => {

    const navigation = useNavigation();

    return (
        <Container>

            <Logo
                width={RFValue(115, 700)}
                style={{ marginLeft: RFValue(16, 700), marginBottom: RFValue(8, 700) }}
            />

            <Container>
                <IconBox
                    focused={screen === 'NewCalc' ? true : false}
                    onPress={() => { navigation.navigate('NewCalc') }}
                >
                    <Icon
                        name="plus-circle"
                        color={globalStyle.colors.secondary}
                        size={RFValue(25, 700)}
                        weight='bold'
                    />
                </IconBox>

                <IconBox
                    focused={screen === 'Historic' ? true : false}
                    onPress={() => { navigation.navigate('Historic') }}
                >
                    <Icon
                        name="list"
                        color={globalStyle.colors.secondary}
                        size={RFValue(25, 700)}
                        weight='bold'
                    />
                </IconBox>

                <IconBox
                    focused={screen === 'Settings' ? true : false}
                    onPress={() => { navigation.navigate('Settings') }}
                >
                    <Icon
                        name="settings"
                        color={globalStyle.colors.secondary}
                        size={RFValue(25, 700)}
                        weight='bold'
                    />
                </IconBox>
            </Container>

        </Container>
    )
}
