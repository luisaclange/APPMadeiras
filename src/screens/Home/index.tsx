import { useNavigation } from "@react-navigation/native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Logo from '../../assets/logo.svg';
import { ButtonLight } from "../../components/Global/ButtonLight";
import { Background, Container, ContainerButtons, ContainerText, Description } from "./styles";

export default function Home() {

    const navigation = useNavigation();

    return (
        //@ts-ignore
        <Background source={require('../../assets/HomeBackground.png')}>
            <Container>
                <ContainerText>
                    <Logo />
                    <Description>
                        Aplicativo de dimensionamento de ligações em madeira
                    </Description>
                </ContainerText>
                <ContainerButtons>
                    <ButtonLight
                        text="Sobre"
                        style={{ width: RFValue(250, 700), marginBottom: RFValue(16, 700) }}
                        //@ts-ignore
                        onPress={() => { navigation.navigate('About') }}
                    />
                    <ButtonLight
                        text="Começar"
                        style={{ width: RFValue(250, 700) }}
                        //@ts-ignore
                        onPress={() => { navigation.navigate('NewCalc') }}
                    />
                </ContainerButtons>
            </Container>
        </Background>
    )
}
