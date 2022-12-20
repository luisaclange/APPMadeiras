import React, { createContext, useState } from 'react';

export interface Data {
    stage1: {
        charging: string;
        humidityClass: string;
    };
    stage2: {
        woodType: string;
        woodName: string;
    };
    stage3: {
        tractiveForce: string;
        widthWood: string;
        heightWood_1: string;
        heightWood_2: string;
        nailDimension: string;
    };
    setStage1(data: Data['stage1']): void;
    setStage2(data: Data['stage2']): void;
    setStage3(data: Data['stage3']): void;
}

const DataContext = createContext<Data>({} as Data);

export function DataProvider({ children }: any) {
    const [stage1, setStage1] = useState<Data['stage1']>({
        charging: undefined,
        humidityClass: undefined,
    });

    const [stage2, setStage2] = useState<Data['stage2']>({
        woodType: undefined,
        woodName: undefined,
    });

    const [stage3, setStage3] = useState<Data['stage3']>({
        tractiveForce: undefined,
        heightWood_1: undefined,
        heightWood_2: undefined,
        nailDimension: undefined,
        widthWood: undefined,
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
