import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import calcDraw from './calcsDraw';
import { CalcModel } from '../../database/models/calcModel';
import PregoDimensions from '../../archive/PinsDimensions/Nails.json';
import ParafusoSoberbaDimensions from '../../archive/PinsDimensions/SuperbScrews.json';
import ParafusoPassanteDimensions from '../../archive/PinsDimensions/ThroughScrews.json';

interface desenhoProps {
	data: CalcModel | Record<string, never>;
	nails: number;
}

const Draw: React.FC<desenhoProps> = ({ data, nails }) => {
	let d: number;
	switch (data.nailType) {
		case 'prego':
			d = PregoDimensions.find(item => item.id === data.nailDimension).JP;

			break;
		case 'parafusoSoberba':
			d = ParafusoSoberbaDimensions.find(
				item => item.id === data.nailDimension,
			).diametro;

			break;
		case 'parafusoPassante':
			d = ParafusoPassanteDimensions.find(
				item => item.id === data.nailDimension,
			).diametro;

			break;
	}

	const [calc, setCalc] = useState({
		bfHorizontal: 0,
		bfVertical: 0,
		nNailsColumn: 0,
		spaceNormalColumnNails: 0,
		nColumns: 0,
		nNailsSpecialColumn: 0,
		bfVerticalSpecial: 0,
		spaceSpecialColumnNails: 0,
		spaceColumns: 0,
	});
	const [loading, setLoading] = useState(true);

	const GetData = useCallback(async () => {
		setCalc(await calcDraw({ nails, data }));
		setLoading(false);
	}, [data, nails]);

	useEffect(() => {
		GetData();
	}, [GetData]);

	const BackgroundImage = styled.ImageBackground`
		height: ${Number(data.widthWood)}px;
		flex-direction: row;
		justify-content: center;
	`;

	const Nail = styled.View`
		height: ${d}px;
		width: ${d}px;
		border-width: 1px;
		background-color: grey;
		border-radius: ${d / 2}px;
	`;

	const SpaceVerticalNormal = styled.View`
		height: ${calc.spaceNormalColumnNails - d}px;
	`;

	const SpaceVerticalSpecial = styled.View`
		height: ${calc.spaceSpecialColumnNails - d}px;
	`;

	const ColumnNormal = styled.View`
		margin-left: ${calc.spaceColumns - d}px;
	`;

	const BorderFreeNormal = styled.View`
		height: ${calc.bfVertical - d / 2}px;
	`;

	const ColumnSpecial = styled.View``;

	const BorderFreeSpecial = styled.View`
		height: ${calc.bfVerticalSpecial - d / 2}px;
	`;

	const MarginHorizontal = styled.View`
		border-right-width: 1px;
		height: 100%;
		width: ${calc.bfHorizontal}px;
	`;

	return (
		<>
			{!loading ? (
				<BackgroundImage source={require('../../assets/images/Detalhamento.jpg')}>
					<ColumnSpecial>
						<BorderFreeSpecial />
						{calc.nNailsSpecialColumn > 0 ? (
							<>
								<Nail />
								{[...Array(calc.nNailsSpecialColumn - 1)].map(
									() => {
										return (
											<>
												<SpaceVerticalSpecial />
												<Nail />
											</>
										);
									},
								)}
							</>
						) : null}
					</ColumnSpecial>
					{[
						...Array(
							calc.nColumns -
							(calc.nNailsSpecialColumn > 0 ? 1 : 0),
						),
					].map((item, index) => {
						return (
							<ColumnNormal key={index}>
								<BorderFreeNormal />
								<Nail />
								{[...Array(calc.nNailsColumn - 1)].map(() => {
									return (
										<>
											<SpaceVerticalNormal />
											<Nail />
										</>
									);
								})}
								<BorderFreeNormal />
							</ColumnNormal>
						);
					})}
					<MarginHorizontal />
				</BackgroundImage>
			) : null}
		</>
	);
};

export default Draw;
