import React from "react";
import { Container, IconContainer, ItensContainer, Shadow, Title } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "../progressBar";

export enum ProgressNewCalc {
  newCalc1,
  newCalc2,
  newCalc3,
}

interface IProps {
  title: string;
  progress: ProgressNewCalc;
}

export default function Header({ title, progress }: IProps) {
  return (
    <Container
      source={require('../../../assets/images/Background.png')}
      imageStyle={{
        height: RFValue(180, 700)
      }}
    >
      <Shadow style={{ opacity: 0.2 }} />
      <LinearGradient
        colors={[
          '#211610',
          'transparent',
        ]}
        style={{ height: '100%', position: 'absolute', width: '100%', justifyContent: 'flex-end' }}
      >
        <ItensContainer>
          <IconContainer />
          <Title>{title}</Title>
          <IconContainer />
        </ItensContainer>
        <ProgressBar stage={progress} />
      </LinearGradient>
    </Container>
  )
}