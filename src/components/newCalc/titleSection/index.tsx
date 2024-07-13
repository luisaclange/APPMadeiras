import React from 'react';
import {
	Container,
	SubTitle,
	Title,
} from './styles';

interface IProps {
	title: string;
	subtitle?: string;
}

export function TitleSection({ title, subtitle }: IProps) {
	return (
		<Container>
			<Title>{title}</Title>
			{subtitle && <SubTitle>{subtitle}</SubTitle>}
		</Container>
	);
}
