import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import DataContext from "../../context/context";
import { NailDimensions } from "../../archive/2_Dimensions/Pregos";
import calcDraw from "./calcsDraw";
import { CalcModel } from "../../database/models/calcModel";
import { database } from "../../database";
import { Item } from "../../components/newCalc/progressBar/styles";

interface desenhoProps {
    data: CalcModel;
    nails: number;
}

const Draw: React.FC<desenhoProps> = ({ data, nails }) => {

    const nail = NailDimensions.find(item => item.id === data.nailDimension)
    const [calc, setCalc] = useState({
        bfHorizontal: 0,
        bfVertical: 0,
        nNailsColumn: 0,
        spaceNormalColumnNails: 0,
        nColumns: 0,
        nNailsSpecialColumn: 0,
        bfVerticalSpecial: 0,
        spaceSpecialColumnNails: 0,
        spaceColumns: 0,
    });
    const [itsOk, setItsOk] = useState(false);

    async function GetData() {
        setCalc(await calcDraw(nails, data.id));
        setItsOk(true);
    }

    useEffect(() => {
        GetData();
    }, [])

    const BackgroundImage = styled.ImageBackground`
        height: ${Number(data.widthWood)}px;
        flex-direction: row;
        justify-content: center;
    `;

    const Nail = styled.View`
        height: ${nail.JP}px;
        width: ${nail.JP}px;
        border-width: 1px;
        background-color: grey;
        border-radius: ${nail.JP / 2}px;
    `;

    const SpaceVerticalNormal = styled.View`
        height: ${calc.spaceNormalColumnNails - nail.JP}px;
    `;

    const SpaceVerticalSpecial = styled.View`
        height: ${calc.spaceSpecialColumnNails - nail.JP}px;
    `;

    const ColumnNormal = styled.View`
        margin-left: ${calc.spaceColumns - nail.JP}px;
    `;

    const BorderFreeNormal = styled.View`
        height: ${calc.bfVertical - nail.JP / 2}px;
    `;

    const ColumnSpecial = styled.View`

    `;

    const BorderFreeSpecial = styled.View`
        height: ${calc.bfVerticalSpecial - nail.JP / 2}px;
    `;

    const MarginHorizontal = styled.View`
        border-right-width: 1px;
        height: 100%;
        width: ${calc.bfHorizontal}px;
    `;

    return (
        <>
            {itsOk ?
                <BackgroundImage source={require("../../assets/678-978.jpg")}>
                    <ColumnSpecial>
                        <BorderFreeSpecial />
                        {
                            calc.nNailsSpecialColumn > 0 ?
                                <>
                                    <Nail />
                                    {
                                        [...Array(calc.nNailsSpecialColumn - 1)].map(() => {
                                            return (
                                                <>
                                                    <SpaceVerticalSpecial />
                                                    <Nail />
                                                </>
                                            )
                                        })
                                    }
                                </>
                                :
                                null
                        }
                    </ColumnSpecial>
                    {
                        [...Array(calc.nColumns - (calc.nNailsSpecialColumn > 0 ? 1 : 0))].map(() => {
                            return (
                                <ColumnNormal>
                                    <BorderFreeNormal />
                                    <Nail />
                                    {[...Array(calc.nNailsColumn - 1)].map(() => {
                                        return (
                                            <>
                                                <SpaceVerticalNormal />
                                                <Nail />
                                            </>
                                        )
                                    })}
                                    <BorderFreeNormal />
                                </ColumnNormal>
                            )
                        })
                    }
                    <MarginHorizontal />
                </BackgroundImage>
                :
                null}
        </>
    )
}

export default Draw;
