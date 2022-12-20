import React, { SetStateAction } from 'react';
import ButtonDark from '../../buttons/buttonDark';
import CustomModal from '../../modal';
import { Container, Message, MessageContainer } from './styles';

interface IProps {
    visible: boolean;
    setVisible: SetStateAction<boolean>;
    message: string;
    actionButton: any;
    textButton: string;
}

export default function PopUpOneButton({
    setVisible,
    visible,
    message,
    actionButton,
    textButton,
}: IProps) {
    return (
        <CustomModal
            backdrop
            dismissOnPress
            setVisible={setVisible}
            visible={visible}
        >
            <Container>
                <MessageContainer>
                    <Message>{message}</Message>
                </MessageContainer>
                <ButtonDark onPress={actionButton} text={textButton} />
            </Container>
        </CustomModal>
    );
}
