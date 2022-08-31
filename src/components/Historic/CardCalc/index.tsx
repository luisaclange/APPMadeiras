import moment from "moment";
import "moment/locale/pt-br"
import React, { useState } from "react";
import { Kmod } from "../../../archive/WoodProperties/Kmod";
import { CalcModel } from "../../../database/models/calcModel";
import { Container, IconsContainer, InfoContainer, ItemText, SubTitle, TextContainer, Title } from "./styles";
import Info from 'react-native-vector-icons/FontAwesome5';
import Trash from 'react-native-vector-icons/Entypo';
import Calculator from 'react-native-vector-icons/Ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import globalStyle from "../../../styles/globalStyle";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ModalInfo } from "../ModalInfo";
import { PopUpOneButton } from "../../Global/PopUpOneButton";
import { PopUpTwoButtons } from "../../Global/PopUpTwoButtons";
import { database } from "../../../database";

interface props {
    item: CalcModel;
    index: number;
    setRefresh: any;
}

export const CardCalc = ({ item, index, setRefresh }: props) => {

    const navigation = useNavigation();

    const woodClass = Kmod.kmod3.find(wood => item.woodClass === wood.id).name;
    const charging = Kmod.kmod1.find(wood => wood.id === item.charging).name;
    const humidiyClass = Kmod.kmod2.find(wood => wood.id === item.humidityClass).name;

    const [modalInfo, setModalInfo] = useState(false);
    const [deleteQuest, setDeleteQuest] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    async function DeleteCalc() {
        await database.write(async () => {
            const aux = await database.get<CalcModel>('calcs').find(item.id);
            await aux.destroyPermanently();
        })
        setDeleteSuccess(true);
    }

    return (
        <Container>
            <ModalInfo
                visible={modalInfo}
                setVisible={setModalInfo}
                item={item}
            />
            <PopUpOneButton
                visible={deleteSuccess}
                setVisible={setDeleteSuccess}
                message="Cálculo deletado com sucesso!"
                actionButton={() => {
                    setRefresh(true);
                    setDeleteSuccess(false)
                }}
                textButton="OK"
            />
            <PopUpTwoButtons
                visible={deleteQuest}
                setVisible={setDeleteQuest}
                message="Tem certeza de que deseja excluir esse cálculo?"
                rActionButton={() => {
                    setDeleteQuest(false)
                }}
                rTextButton="Não"
                lActionButton={() => {
                    setDeleteQuest(false);
                    DeleteCalc();
                }}
                lTextButton="Sim"
            />
            <InfoContainer>
                <Title>Calculo #{index}</Title>
                <SubTitle>
                    {moment(new Date(item.created_at)).format('L')} - {''}
                    {moment(new Date(item.created_at)).format('LT')}
                </SubTitle>
                <TextContainer>
                    <ItemText>
                        - {woodClass}
                    </ItemText>
                    <ItemText>
                        - Carregamento {charging}
                    </ItemText>
                    <ItemText>
                        - Classe de Umidade {humidiyClass}
                    </ItemText>
                </TextContainer>
            </InfoContainer>

            <IconsContainer>
                <TouchableOpacity onPress={() => {
                    setModalInfo(true);
                }}>
                    <Info name="info-circle" size={RFValue(30, 700)} color={globalStyle.colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setDeleteQuest(true);
                }}>
                    <Trash name="trash" size={RFValue(30, 700)} color={globalStyle.colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={async () => {
                    await AsyncStorage.setItem('@id_calc', item.id);
                    navigation.navigate('Result')
                }}>
                    <Calculator name="calculator" size={RFValue(30, 700)} color={globalStyle.colors.primary} />
                </TouchableOpacity>
            </IconsContainer>
        </Container >
    )
}
