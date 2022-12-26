import React, { createContext, useState } from 'react';

export interface Data {
  stage1: {
    description: string;
    charging: string;
    humidityClass: string;
    woodName: string;
    woodType: string;
  };
  stage2: {
    ligationType: string;
    nailType: string;
    calc: string;
  };
  stage3: {
    tractiveForce: string;
    widthWood: string;
    espWood_1: string;
    espWood_2: string;
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
    description: undefined,
    humidityClass: undefined,
    woodName: undefined,
    woodType: undefined
  });

  const [stage2, setStage2] = useState<Data['stage2']>({
    calc: undefined,
    ligationType: undefined,
    nailType: undefined,
  });

  const [stage3, setStage3] = useState<Data['stage3']>({
    heightWood_1: undefined,
    heightWood_2: undefined,
    nailDimension: undefined,
    tractiveForce: undefined,
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
