import React from "react";
import { Container, IconBox } from "./styles";
import { Gear, ListDashes, Plus } from 'phosphor-react-native'
import globalStyle from "../../../styles/globalStyle";
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from "@react-navigation/native";
import Logo from '../../../assets/logo.svg';

interface Props {
    screen: string;
}

export const Header: React.FC<Props> = ({ screen }) => {

    const navigation = useNavigation();

    return (
        <Container>

            <Logo
                width={115}
                style={{ marginLeft: RFValue(16, 700), marginBottom: RFValue(8, 700) }}
            />

            <Container>
                <IconBox
                    focused={screen === 'NewCalc' ? true : false}
                    onPress={() => { navigation.navigate('NewCalc') }}
                >
                    <Plus
                        color={globalStyle.colors.secondary}
                        size={RFValue(20, 700)}
                        weight='bold'
                    />
                </IconBox>

                <IconBox
                    focused={screen === 'Historic' ? true : false}
                    onPress={() => { navigation.navigate('Historic') }}
                >
                    <ListDashes
                        color={globalStyle.colors.secondary}
                        size={RFValue(20, 700)}
                        weight='bold'
                    />
                </IconBox>

                <IconBox
                    focused={screen === 'Settings' ? true : false}
                    onPress={() => { navigation.navigate('Settings') }}
                >
                    <Gear
                        color={globalStyle.colors.secondary}
                        size={RFValue(20, 700)}
                        weight='bold'
                    />
                </IconBox>
            </Container>

        </Container>
    )
}
