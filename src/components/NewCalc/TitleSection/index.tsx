import React from "react";
import { BorderSection, Container, SectionContainer, SubTitle, Title } from "./styles";

interface props {
    title: string;
    subtitle: string;
}

export const TitleSection: React.FC<props> = ({ title, subtitle }) => {
    return (
        <Container>
            <BorderSection>
                <SectionContainer>
                    <Title>{title}</Title>
                    <SubTitle>{subtitle}</SubTitle>
                </SectionContainer>
            </BorderSection>
        </Container>
    )
}
