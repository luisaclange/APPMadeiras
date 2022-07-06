import React from "react";
import { Container, IconBox } from "./styles";
import globalStyle from "../../../styles/globalStyle";
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from "@react-navigation/native";
import Logo from '../../../assets/logo.svg';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback } from "react-native";

export const Header: React.FC = () => {

    const route = useRoute();

    const navigation = useNavigation();

    return (
        <Container>

            <TouchableWithoutFeedback onPress={() => {
                //@ts-ignore
                navigation.navigate('Home')
            }}>
                <Logo
                    width={RFValue(115, 700)}
                    style={{ marginLeft: RFValue(16, 700), marginBottom: RFValue(8, 700) }}
                />
            </TouchableWithoutFeedback>

            <Container>
                <IconBox
                    focused={route.name === 'NewCalc1' ? true : false}
                    onPress={() => {
                        //@ts-ignore
                        navigation.navigate('NewCalc')
                    }}
                >
                    <Icon
                        name="plus-circle"
                        color={globalStyle.colors.secondary}
                        size={RFValue(25, 700)}
                        weight='bold'
                    />
                </IconBox>

                <IconBox
                    focused={route.name === 'Historic' ? true : false}
                    onPress={() => {
                        //@ts-ignore
                        navigation.navigate('Historic')
                    }}
                >
                    <Icon
                        name="list"
                        color={globalStyle.colors.secondary}
                        size={RFValue(25, 700)}
                        weight='bold'
                    />
                </IconBox>

                <IconBox
                    focused={route.name === 'Settings' ? true : false}
                    onPress={() => {
                        //@ts-ignore
                        navigation.navigate('Settings')
                    }}
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
