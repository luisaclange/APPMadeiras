import React from 'react';
import { Border, Container, FieldsContainer } from './styles';

interface IProps {
    children: React.ReactNode;
}

export function BackgroundFields({ children }: IProps) {
    return (
        <Container>
            <Border>
                <FieldsContainer>{children}</FieldsContainer>
            </Border>
        </Container>
    );
}
