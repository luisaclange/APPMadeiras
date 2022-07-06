import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { Background } from "../../components/Global/Background";
import { Header } from "../../components/Global/Header";
import { BackgroundFields } from "../../components/NewCalc/BackgroundFields";
import CalcWoodDimension from "../../project";
import Desenho from "../../project/desenho/desenho";

export default function Result() {

    const {
        B,
        Blim,
        fc0d,
        ft0d,
        kmod,
        Rvd1,
        nNails
    } = CalcWoodDimension();

    return (
        <Background>
            <Header />
            <BackgroundFields>
                <Text>Kmod: {kmod.toFixed(2)}</Text>
                <Text>Fc0d: {fc0d.toFixed(2)}</Text>
                <Text>Ft0d: {ft0d.toFixed(2)}</Text>
                <Text>B: {B.toFixed(2)}</Text>
                <Text>Blim: {Blim.toFixed(2)}</Text>
                <Text>Rvd1: {Rvd1.toFixed(2)}</Text>
                <Text>Numero de pregos: {nNails}</Text>
                <Desenho nails={nNails} />
            </BackgroundFields>
        </Background>
    )
}
