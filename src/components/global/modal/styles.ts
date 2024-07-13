import styled, { css } from 'styled-components/native';

interface IProps {
	backdrop: boolean;
}

export const Backdrop = styled.View<IProps>`
	width: 100%;
	height: 100%;
	opacity: 0.5;

	${({ backdrop }) =>
		backdrop === true &&
		css`
			background-color: black;
		`}
`;

export const Modal = styled.Modal`
	position: relative;
`;

export const PopUp = styled.View`
	position: absolute;
	width: 100%;
	height: 100%;
`;
