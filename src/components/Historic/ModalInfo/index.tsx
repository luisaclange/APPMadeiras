import React from 'react';
import moment from 'moment';
import { CalcModel } from '../../../database/models/calcModel';
import CustomModal from '../../global/modal';
import { Container, TextInfo } from './styles';
import { Kmod } from '../../../archive/4_WoodProperties/Kmod';

interface IProps {
    visible: boolean;
    setVisible: any;
    item: CalcModel;
}

export default function ModalInfo({ item, setVisible, visible }: IProps) {
    const charging = Kmod.kmod1.find((wood) => wood.id === item.charging).name;

    // const charging = Kmod.kmod2.find(wood => wood.id === item.woodClass).name;
    // const woodClass = Kmod.kmod3.find(wood => wood.id === item.woodClass).name;
    return (
        <CustomModal
            visible={visible}
            backdrop
            dismissOnPress
            setVisible={setVisible}
        >
            <Container>
                <TextInfo>Tipo de carregamento: {charging}</TextInfo>
                {/* <TextInfo>Classificação da madeira: {woodClass}</TextInfo> */}
                <TextInfo>
                    Criado em: {moment(item.created_at).format('L')}
                </TextInfo>
            </Container>
        </CustomModal>
    );
}
