import React, { SetStateAction } from 'react';
import ButtonDark from '../../buttons/buttonDark';
import CustomModal from '../../modal';
import {
    ButtonsContainer,
    Container,
    Message,
    MessageContainer,
} from './styles';

interface IProps {
    visible: boolean;
    setVisible: SetStateAction<boolean>;
    message: string;
    lActionButton: any;
    lTextButton: string;
    rActionButton: any;
    rTextButton: string;
}

export default function PopUpTwoButtons({
    setVisible,
    visible,
    message,
    lActionButton,
    lTextButton,
    rActionButton,
    rTextButton,
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
                <ButtonsContainer>
                    <ButtonDark onPress={lActionButton} text={lTextButton} />
                    <ButtonDark onPress={rActionButton} text={rTextButton} />
                </ButtonsContainer>
            </Container>
        </CustomModal>
    );
}
