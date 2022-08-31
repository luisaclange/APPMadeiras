import React, { SetStateAction } from "react";
import { ButtonDark } from "../ButtonDark";
import CustomModal from "../Modal";
import { ButtonsContainer, Container, Message, MessageContainer } from "./styles";

interface props {
    visible: boolean;
    setVisible: SetStateAction<boolean>;
    message: string;
    lActionButton: any;
    lTextButton: string;
    rActionButton: any;
    rTextButton: string;
}

export const PopUpTwoButtons: React.FC<props> = ({ setVisible, visible, message, lActionButton, lTextButton, rActionButton, rTextButton }) => {
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
                    <ButtonDark
                        onPress={lActionButton}
                        text={lTextButton}
                    />
                    <ButtonDark
                        onPress={rActionButton}
                        text={rTextButton}
                    />
                </ButtonsContainer>
            </Container>
        </CustomModal>
    )
}
