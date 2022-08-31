import React, { SetStateAction } from "react";
import { ButtonDark } from "../ButtonDark";
import CustomModal from "../Modal";
import { Container, Message, MessageContainer } from "./styles";

interface props {
    visible: boolean;
    setVisible: SetStateAction<boolean>;
    message: string;
    actionButton: any;
    textButton: string;
}

export const PopUpOneButton: React.FC<props> = ({ setVisible, visible, message, actionButton, textButton }) => {
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
                <ButtonDark
                    onPress={actionButton}
                    text={textButton}
                />
            </Container>
        </CustomModal>
    )
}
