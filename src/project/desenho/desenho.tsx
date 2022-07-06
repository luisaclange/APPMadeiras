import React, { useContext } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import DataContext from "../../context/context";
import { NailDimensions } from "../../Data/2_Dimensions/Pregos";
import {
    DragResizeBlock,
} from 'react-native-drag-resize';

interface desenhoProps {
    nails: number
}

const Desenho: React.FC<desenhoProps> = ({ nails }) => {

    const { stage4 } = useContext(DataContext);

    const nail = NailDimensions.find((prego: any) => { return (prego.id == stage4.nailDimension) });

    const nPregoColunas = Math.floor((Number(stage4.widthWood) - 8 * nail.JP) / (nail.JP * 4)) + 2;

    const nColunas = Math.floor(nails / nPregoColunas);

    var i = 0, columnsNormal: any = [];
    while (++i <= nPregoColunas) columnsNormal.push(i);

    var j = 0, nColumnsNormal = [];
    while (++j <= nColunas) nColumnsNormal.push(j);

    var z = 0, excedente = [];
    while (++z <= (nails - nColunas * nPregoColunas)) excedente.push(z);

    var k = 0, excedenteLayer = [];
    while (++k < (nails - nColunas * nPregoColunas)) excedenteLayer.push(k);

    var s = 0, columnsNormalLayer: any = [];
    while (++s < nPregoColunas) columnsNormalLayer.push(s);

    var r = 0, nColumnsNormalLayer = [];
    while (++r < nColunas) nColumnsNormalLayer.push(r);

    console.log(nails, nColunas, nPregoColunas)

    const styles = StyleSheet.create({
        fundo: {
            height: Number(stage4.widthWood),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        coluna: {
            flexDirection: "column",
            marginHorizontal: 6 * nail.JP
        },
        prego: {
            height: nail.JP,
            width: nail.JP,
            borderWidth: 1,
            backgroundColor: "grey",
            borderRadius: nail.JP / 2,
            marginVertical: 1.5 * nail.JP
        },
        final: {
            height: '100%',
            width: 2,
            backgroundColor: 'black',
            marginLeft: 4 * nail.JP,
            marginRight: 4 * nail.JP
        },
        layerLeft: {
            minWidth: 30,
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            justifyContent: "center",
            alignItems: 'center'
        },
        layerBottom: {
            height: 20,
            marginTop: 10,
            borderLeftWidth: 0.5,
            borderRightWidth: 0.5,
            justifyContent: "center",
            alignItems: 'center'
        }
    })

    return (
        <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <View style={{ marginRight: 10 }}>
                    <View style={{ ...styles.layerLeft, height: (Number(stage4.widthWood) - (excedente.length - 1) * 4 * nail.JP) / 2 }}>
                        <Text style={{ fontSize: 8 }}>{((Number(stage4.widthWood) - (excedente.length - 1) * 4 * nail.JP) / 2).toFixed(2)}</Text>
                    </View>
                    {excedenteLayer.map((i: any) => {
                        return (<View key={i + 30} style={{ ...styles.layerLeft, height: 4 * nail.JP }}>
                            <Text style={{ fontSize: 8 }}>{(4 * nail.JP).toFixed(2)}</Text>
                        </View>)
                    })}
                    <View style={{ ...styles.layerLeft, height: (Number(stage4.widthWood) - (excedente.length - 1) * 4 * nail.JP) / 2 }}>
                        <Text style={{ fontSize: 8 }}>{((Number(stage4.widthWood) - (excedente.length - 1) * 4 * nail.JP) / 2).toFixed(2)}</Text>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 2, borderTopWidth: 2, flexDirection: 'row' }}>
                    <ImageBackground source={require("../../assets/678-978.jpg")} style={styles.fundo}>
                        <View style={styles.coluna}>
                            {excedente.map((i: any) => {
                                return (<View key={i + 30} style={styles.prego}></View>)
                            })}
                        </View>
                        {nColumnsNormal.map((i: any) => {
                            return (<View key={i + 50} style={styles.coluna}>
                                {columnsNormal.map((i: any) => {
                                    return (<View key={i} style={styles.prego}></View>)
                                })}
                            </View>)
                        })}
                        <View style={styles.final}></View>
                    </ImageBackground>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <View style={{ ...styles.layerLeft, height: (Number(stage4.widthWood) - (nPregoColunas - 1) * 4 * nail.JP) / 2 }}>
                        <Text style={{ fontSize: 8 }}>{((Number(stage4.widthWood) - (nPregoColunas - 1) * 4 * nail.JP) / 2).toFixed(2)}</Text>
                    </View>
                    {columnsNormalLayer.map((i: any) => {
                        return (<View key={i + 30} style={{ ...styles.layerLeft, height: 4 * nail.JP }}>
                            <Text style={{ fontSize: 8 }}>{(4 * nail.JP).toFixed(2)}</Text>
                        </View>)
                    })}
                    <View style={{ ...styles.layerLeft, height: (Number(stage4.widthWood) - (nPregoColunas - 1) * 4 * nail.JP) / 2 }}>
                        <Text style={{ fontSize: 8 }}>{((Number(stage4.widthWood) - (nPregoColunas - 1) * 4 * nail.JP) / 2).toFixed(2)}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                <View style={{ width: 6.5 * nail.JP }}></View>
                {(excedente.length > 0 ? nColumnsNormal : nColumnsNormalLayer).map((i: any) => {
                    return (<View key={i + 30} style={{ ...styles.layerBottom, width: 13 * nail.JP }}>
                        <Text style={{ fontSize: 8 }}>{(13 * nail.JP).toFixed(2)}</Text>
                    </View>)
                })}
                <View style={{ ...styles.layerBottom, width: 10.5 * nail.JP }}>
                    <Text style={{ fontSize: 8 }}>{(10.5 * nail.JP).toFixed(2)}</Text>
                </View>
                <View style={{ width: 4 * nail.JP + 2 }}></View>
            </View>
        </View>
    )
}

export default Desenho;
