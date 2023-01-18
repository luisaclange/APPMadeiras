import styled, { css } from 'styled-components/native';

interface Props {
	backdrop: boolean;
}

export const Modal = styled.Modal`
	position: relative;
`;

export const Backdrop = styled.View<Props>`
	width: 100%;
	height: 100%;
	opacity: 0.5;

	${({ backdrop }) =>
		backdrop === true &&
		css`
			background-color: black;
		`}
`;

export const PopUp = styled.View`
	position: absolute;
	width: 100%;
	height: 100%;
`;
