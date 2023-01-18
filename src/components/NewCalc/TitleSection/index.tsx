import React from 'react';
import {
	BorderSection,
	Container,
	SectionContainer,
	SubTitle,
	Title,
} from './styles';

interface IProps {
	title: string;
	subtitle: string;
}

export function TitleSection({ title, subtitle }: IProps) {
	return (
		<Container>
			<Title>{title}</Title>
			<SubTitle>{subtitle}</SubTitle>
		</Container>
	);
}
