import React, { createContext, useState } from "react";

export interface Data {
    stage1: {
        charging: string,
        humidityClass: string
    },
    stage2: {
        woodType: string,
        woodClass: string,
        dicotyledonClass?: string
    },
    stage3: {
        tractiveForce: string,
        fyk_nail: string,
        woodResistanceClass: string,
        // fc0k_wood: string,
        // ft0k_wood: string,
    },
    stage4: {
        widthWood: string,
        heightWood_1: string,
        heightWood_2: string,
        nailDimension: string
    },
    setStage1(data: Data['stage1']): void,
    setStage2(data: Data['stage2']): void,
    setStage3(data: Data['stage3']): void,
    setStage4(data: Data['stage4']): void
}

const DataContext = createContext<Data>({} as Data);

export const DataProvider: React.FC = ({ children }) => {

    const [stage1, setStage1] = useState<Data['stage1']>({
        charging: undefined,
        humidityClass: undefined
    });

    const [stage2, setStage2] = useState<Data['stage2']>({
        woodType: undefined,
        woodClass: undefined
    });

    const [stage3, setStage3] = useState<Data['stage3']>({
        // fc0k_wood: undefined,
        // ft0k_wood: undefined,
        fyk_nail: undefined,
        tractiveForce: undefined,
        woodResistanceClass: undefined
    });

    const [stage4, setStage4] = useState<Data['stage4']>({
        heightWood_1: undefined,
        heightWood_2: undefined,
        nailDimension: undefined,
        widthWood: undefined
    });

    return (
        <DataContext.Provider value={{
            stage1,
            stage2,
            stage3,
            stage4,
            setStage1,
            setStage2,
            setStage3,
            setStage4
        }}>
            {children}
        </DataContext.Provider>
    )
};

export default DataContext;
