import React, { useContext } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import DataContext from "../../context/context";
import { NailDimensions } from "../../Data/2_Dimensions/Pregos";
import calcDraw from "./calcsDraw";

interface desenhoProps {
    nails: number
}

const Draw: React.FC<desenhoProps> = ({ nails }) => {

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
    } = calcDraw(nails)

    const { stage4 } = useContext(DataContext);
    const nail = NailDimensions.find((item) => {
        return (
            item.id === stage4.nailDimension
        )
    })

    const BackgroundImage = styled.ImageBackground`
        height: ${Number(stage4.widthWood)}px;
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
        height: ${spaceNormalColumnNails - nail.JP}px;
    `;

    const SpaceVerticalSpecial = styled.View`
        height: ${spaceSpecialColumnNails - nail.JP}px;
    `;

    const ColumnNormal = styled.View`
        margin-left: ${spaceColumns - nail.JP}px;
    `;

    const BorderFreeNormal = styled.View`
        height: ${bfVertical - nail.JP / 2}px;
    `;

    const ColumnSpecial = styled.View`

    `;

    const BorderFreeSpecial = styled.View`
        height: ${bfVerticalSpecial - nail.JP / 2}px;
    `;

    const MarginHorizontal = styled.View`
        border-right-width: 1px;
        height: 100%;
        width: ${bfHorizontal}px;
    `;

    return (
        <>
            <BackgroundImage source={require("../../assets/678-978.jpg")}>
                <ColumnSpecial>
                    <BorderFreeSpecial />
                    {
                        nNailsSpecialColumn > 0 ?
                            <>
                                <Nail />
                                {
                                    [...Array(nNailsSpecialColumn - 1)].map(() => {
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
                            <></>
                    }
                </ColumnSpecial>
                {
                    [...Array(nColumns)].map(() => {
                        return (
                            <ColumnNormal>
                                <BorderFreeNormal />
                                <Nail />
                                {[...Array(nNailsColumn - 1)].map(() => {
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
        </>
    )
}

export default Draw;
