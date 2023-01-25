import React, { Dispatch, SetStateAction, createContext, useState } from 'react';

export interface Data {
	stage1: {
		description: string;
		charging: string;
		humidityClass: string;
		woodName: number;
		woodType: string;
	};
	stage2: {
		ligationType: string;
		pinType: string;
		calc: string;
	};
	stage3: {
		tractiveForce: string;
		widthWood: string;
		espWood_1: string;
		espWood_2: string;
		pinSelected: string;
		numberPins: string;
	};
	setStage1: Dispatch<SetStateAction<Data['stage1']>>;
	setStage2: Dispatch<SetStateAction<Data['stage2']>>;
	setStage3: Dispatch<SetStateAction<Data['stage3']>>;
}

const DataContext = createContext<Data>({} as Data);

export function DataProvider({ children }: any) {
	const [stage1, setStage1] = useState<Data['stage1']>({
		charging: undefined,
		description: undefined,
		humidityClass: undefined,
		woodName: undefined,
		woodType: undefined,
	});

	const [stage2, setStage2] = useState<Data['stage2']>({
		calc: undefined,
		ligationType: undefined,
		pinType: undefined,
	});

	const [stage3, setStage3] = useState<Data['stage3']>({
		espWood_1: undefined,
		espWood_2: undefined,
		pinSelected: undefined,
		tractiveForce: undefined,
		widthWood: undefined,
		numberPins: undefined,
	});

	return (
		<DataContext.Provider
			value={{
				stage1,
				stage2,
				stage3,
				setStage1,
				setStage2,
				setStage3,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

export default DataContext;
