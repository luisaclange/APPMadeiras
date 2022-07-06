import React from "react";
import { ButtonDark } from "../../Global/ButtonDark";
import { Container } from "./styles";

interface props {
    prevAction?: any;
    nextAction?: any;
}

export const ButtonsPrevNext: React.FC<props> = ({ nextAction, prevAction }) => {

    return (
        <Container
            style={{ justifyContent: prevAction && nextAction ? 'space-between' : prevAction ? 'flex-start' : 'flex-end' }}
        >
            {
                prevAction ?
                    <ButtonDark
                        text="Voltar"
                        onPress={prevAction}
                    />
                    :
                    <></>
            }
            {
                nextAction ?
                    <ButtonDark
                        text="Próximo"
                        onPress={nextAction}
                    />
                    :
                    <></>
            }
        </Container>
    )
}
