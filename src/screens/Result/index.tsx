import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { Background } from "../../components/Global/Background";
import { Header } from "../../components/Global/Header";
import { BackgroundFields } from "../../components/NewCalc/BackgroundFields";
import CalcWoodDimension from "../../project";
import calcDraw from "../../project/draw/calcsDraw";
import Draw from "../../project/draw/draw";

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

    const {
        bfHorizontal,
        bfVertical,
        nNailsColumn,
        spaceNormalColumnNails,
        nColumns,
        nNailsSpecialColumn,
        bfVerticalSpecial,
        spaceSpecialColumnNails,
        spaceColumns
    } = calcDraw(nNails)

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
                <Draw nails={nNails} />

                <Text>Borda horizontal: {bfHorizontal} mm</Text>
                <Text>Borda vertical: {bfVertical} mm</Text>
                <Text>numero de pregos por coluna: {nNailsColumn} pregos</Text>
                <Text>espaço entre pregos - coluna normal: {spaceNormalColumnNails.toFixed(2)} mm</Text>
                <Text>numero de colunas: {nColumns}</Text>
                <Text>pregos na ultima coluna: {nNailsSpecialColumn} prego</Text>
                <Text>Borda vertical ultima coluna: {bfVerticalSpecial} mm</Text>
                <Text>espaço entre pregos - ultima coluna: {spaceSpecialColumnNails.toFixed(2)} mm</Text>
                <Text>espaço entre colunas: {spaceColumns} mm</Text>
            </BackgroundFields>
        </Background>
    )
}
