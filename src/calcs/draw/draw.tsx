import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import calcDraw from './calcsDraw';
import { CalcModel } from '../../database/models/calcModel';
import { ContainerCapture, ContainerDraw } from './styles';
import ViewShot from 'react-native-view-shot';

interface IProps {
	data: CalcModel | Record<string, never>;
	pins: number;
	setUriPhoto: Dispatch<SetStateAction<string>>;
}

export default function Draw({ data, pins, setUriPhoto }: IProps) {

	// Variáveis
	const [calc, setCalc] = useState({
		bfHorizontal: 0,
		bfVertical: 0,
		nPinsColumn: 0,
		spaceNormalColumnPins: 0,
		nColumns: 0,
		nPinsSpecialColumn: 0,
		bfVerticalSpecial: 0,
		spaceSpecialColumnPins: 0,
		spaceColumns: 0,
		d: 0
	});
	const [loading, setLoading] = useState(true);
	const ref = useRef();

	// Buscar dados
	const GetData = useCallback(async () => {
		setCalc(await calcDraw({ pins, data }));
		setLoading(false);
	}, [data, pins]);

	useEffect(() => {
		GetData();
	}, [GetData]);

	// Mostrar URI
	const onCapture = useCallback(uri => {
		console.log('Dados da foto: ', uri);
		setUriPhoto(uri);
	}, [setUriPhoto]);

	// Estilo
	const BackgroundImage = styled.ImageBackground`
		height: ${Number(data.widthWood)}px;
		flex-direction: row;
		justify-content: center;
		flex: 1;
		border-top-width: 1px;
		border-bottom-width: 1px;
	`;

	const Pin = styled.View`
		height: ${calc.d}px;
		width: ${calc.d}px;
		border-width: 1px;
		background-color: grey;
		border-radius: ${calc.d / 2}px;
	`;

	const SpaceVerticalNormal = styled.View`
		height: ${calc.spaceNormalColumnPins - calc.d}px;
	`;

	const SpaceVerticalSpecial = styled.View`
		height: ${calc.spaceSpecialColumnPins - calc.d}px;
	`;

	const ColumnNormal = styled.View`
		margin-left: ${calc.spaceColumns - calc.d}px;
	`;

	const BorderFreeNormal = styled.View`
		height: ${calc.bfVertical - calc.d / 2}px;
	`;

	const ColumnSpecial = styled.View``;

	const BorderFreeSpecial = styled.View`
		height: ${calc.bfVerticalSpecial - calc.d / 2}px;
	`;

	const MarginHorizontal = styled.View`
		border-right-width: 1px;
		height: 100%;
		width: ${calc.bfHorizontal - calc.d / 2}px;
	`;

	const CotaTop = styled.View`
		margin-bottom: 2px;
		border-left-width: 1px;
		flex-direction: row;
	`;

	const CotaLeft = styled.View`
		margin-right: 2px;
		border-bottom-width: 1px;
		margin-left: 16px;
	`;

	const CotaRight = styled.View`
		margin-left: 2px;
		border-bottom-width: 1px;
		margin-right: 16px;
	`;

	const CotaMarginHorizontal = styled.View`
		border-right-width: 1px;
		border-top-width: 1px;
		width: ${calc.bfHorizontal}px;
		height: 10px;
	`;

	const CotaSpaceHorizontal = styled.View`
		border-right-width: 1px;
		border-top-width: 1px;
		width: ${calc.spaceColumns}px;
		height: 10px;
	`;

	const CotaSpaceVerticalSpecial = styled.View`
		border-left-width: 1px;
		border-top-width: 1px;
		height: ${calc.spaceSpecialColumnPins}px;
		width: 10px;
	`;

	const CotaSpaceVerticalNormal = styled.View`
		border-right-width: 1px;
		border-top-width: 1px;
		height: ${calc.spaceNormalColumnPins}px;
		width: 10px;
	`;

	const CotaBorderFreeSpecial = styled.View`
		border-left-width: 1px;
		border-top-width: 1px;
		height: ${calc.bfVerticalSpecial}px;
		width: 10px;
	`;

	const CotaBorderFreeNormal = styled.View`
		border-right-width: 1px;
		border-top-width: 1px;
		height: ${calc.bfVertical}px;
		width: 10px;
	`;

	const CotaItemHorizontal = styled.View`
		align-items: center;
		position: relative;
	`;

	const CotaItemVertical = styled.View`
		flex-direction: row;
		align-items: center;
		position: relative;
	`;

	const CotaTextHorizontal = styled.Text`
		font-size: 10px;
		position: absolute;
		bottom: 10px;
	`;

	const CotaTextVerticalLeft = styled.Text`
		font-size: 10px;
		position: absolute;
		right: 11px;
	`;

	const CotaTextVerticalRight = styled.Text`
		font-size: 10px;
		position: absolute;
		left: 11px;
	`;

	const Center = styled.View`
		width: 100%;
		flex-direction: row;
	`;

	return (
		<ContainerDraw>
			{!loading && (
				<ViewShot ref={ref} captureMode='mount' onCapture={onCapture}>
					<ContainerCapture>
						{/* Cota no topo */}
						<CotaTop>
							{[
								...Array(
									calc.nColumns - 1,
								),
							].map((item, index) => {
								return (
									<CotaItemHorizontal key={`cotaSpaceHorizontal${index}`}>
										<CotaTextHorizontal>{calc.spaceColumns}</CotaTextHorizontal>
										<CotaSpaceHorizontal />
									</CotaItemHorizontal>
								);
							})}
							<CotaItemHorizontal>
								<CotaTextHorizontal>{calc.bfHorizontal}</CotaTextHorizontal>
								<CotaMarginHorizontal />
							</CotaItemHorizontal>
						</CotaTop>
						<Center>

							{/* Cota esquerda */}
							<CotaLeft>
								<CotaItemVertical>
									<CotaTextVerticalLeft>{calc.bfVertical}</CotaTextVerticalLeft>
									<CotaBorderFreeSpecial />
								</CotaItemVertical>
								{[...Array(calc.nPinsSpecialColumn - 1)].map(
									(item, index) => {
										return (
											<CotaItemVertical key={`cotaSpaceLeft${index}`}>
												<CotaTextVerticalLeft>{calc.spaceSpecialColumnPins}</CotaTextVerticalLeft>
												<CotaSpaceVerticalSpecial />
											</CotaItemVertical>
										);
									},
								)}
								<CotaItemVertical>
									<CotaTextVerticalLeft>{calc.bfVertical}</CotaTextVerticalLeft>
									<CotaBorderFreeSpecial />
								</CotaItemVertical>
							</CotaLeft>

							<BackgroundImage source={require('../../assets/images/Detalhamento.jpg')}>
								<ColumnSpecial>
									<BorderFreeSpecial />
									{calc.nPinsSpecialColumn > 0 && (
										<>
											<Pin />
											{[...Array(calc.nPinsSpecialColumn - 1)].map(
												(item, index) => {
													return (
														<>
															<SpaceVerticalSpecial key={`specialSpace${index}`} />
															<Pin key={`specialPin${index}`} />
														</>
													);
												},
											)}
										</>
									)}
								</ColumnSpecial>
								{[
									...Array(
										calc.nColumns -
										(calc.nPinsSpecialColumn > 0 ? 1 : 0),
									),
								].map((item, index) => {
									return (
										<ColumnNormal key={`normalColumn${index}`}>
											<BorderFreeNormal />
											<Pin />
											{[...Array(calc.nPinsColumn - 1)].map(() => {
												return (
													<>
														<SpaceVerticalNormal />
														<Pin />
													</>
												);
											})}
											<BorderFreeNormal />
										</ColumnNormal>
									);
								})}
								<MarginHorizontal />
							</BackgroundImage>

							<CotaRight>
								<CotaItemVertical>
									<CotaTextVerticalRight>{calc.bfVertical}</CotaTextVerticalRight>
									<CotaBorderFreeNormal />
								</CotaItemVertical>
								{[...Array(calc.nPinsColumn - 1)].map(
									(item, index) => {
										return (
											<CotaItemVertical key={`cotaSpaceLeft${index}`}>
												<CotaTextVerticalRight>{calc.spaceNormalColumnPins}</CotaTextVerticalRight>
												<CotaSpaceVerticalNormal />
											</CotaItemVertical>
										);
									},
								)}
								<CotaItemVertical>
									<CotaTextVerticalRight>{calc.bfVertical}</CotaTextVerticalRight>
									<CotaBorderFreeNormal />
								</CotaItemVertical>
							</CotaRight>
						</Center>
					</ContainerCapture>
				</ViewShot>
			)}
		</ContainerDraw>
	);
}
