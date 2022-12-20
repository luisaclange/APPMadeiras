import React from 'react';
import { ButtonDark } from '../../global/buttons/buttonDark';
import { Container } from './styles';

interface IProps {
    prevAction?: any;
    nextAction?: any;
}

export function ButtonsPrevNext({ nextAction, prevAction }: IProps) {
    return (
        <Container
            style={{
                justifyContent:
                    prevAction && nextAction
                        ? 'space-between'
                        : prevAction
                            ? 'flex-start'
                            : 'flex-end',
            }}
        >
            {prevAction ? (
                <ButtonDark text="Voltar" onPress={prevAction} />
            ) : (
                <></>
            )}
            {nextAction ? (
                <ButtonDark text="Próximo" onPress={nextAction} />
            ) : (
                <></>
            )}
        </Container>
    );
}
