import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { ButtonLight } from '../../components/Global/ButtonLight';
import {
    Background,
    Container,
    ContainerButtons,
    ContainerText,
    Description,
} from './styles';

export default function Home() {
    const navigation = useNavigation();

    return (
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
                        style={{
                            width: RFValue(250, 700),
                            marginBottom: RFValue(16, 700),
                        }}
                        onPress={() => { }}
                    />
                    <ButtonLight
                        text="Começar"
                        style={{ width: RFValue(250, 700) }}
                        onPress={() => {
                            navigation.dispatch(CommonActions.navigate('Historic'));
                        }}
                    />
                </ContainerButtons>
            </Container>
        </Background>
    );
}
