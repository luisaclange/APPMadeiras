import React from "react";
import { Border, Container, FieldsContainer } from "./styles";

interface props {
    children: React.ReactNode;
}

export const BackgroundFields: React.FC = ({ children }) => {
    return (
        <Container>
            <Border>
                <FieldsContainer>
                    {children}
                </FieldsContainer>
            </Border>
        </Container>
    )
}
