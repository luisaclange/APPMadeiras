import React from "react";
import { CalcModel } from "../../../database/models/calcModel";
import CustomModal from "../../Global/Modal";
import { Container, TextInfo } from "./styles";
import { Kmod } from '../../../archive/WoodProperties/Kmod';
import moment from "moment";

interface props {
    visible: boolean;
    setVisible: any;
    item: CalcModel;
}

export const ModalInfo: React.FC<props> = ({ item, setVisible, visible }) => {

    const charging = Kmod.kmod1.find(wood => wood.id === item.charging).name;
    //const charging = Kmod.kmod2.find(wood => wood.id === item.woodClass).name;
    //const woodClass = Kmod.kmod3.find(wood => wood.id === item.woodClass).name;


    return (
        <CustomModal
            visible={visible}
            backdrop
            dismissOnPress={true}
            setVisible={setVisible}
        >
            <Container>
                <TextInfo>Tipo de carregamento: {charging}</TextInfo>
                {/* <TextInfo>Classificação da madeira: {woodClass}</TextInfo> */}
                <TextInfo>Criado em: {moment(item.created_at).format('L')}</TextInfo>
            </Container>
        </CustomModal>
    )
}
