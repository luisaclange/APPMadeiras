import moment from 'moment';
import 'moment/locale/pt-br';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import Info from '../../../assets/svgs/info.svg';
import Trash from '../../../assets/svgs/trash.svg';
import Calculator from '../../../assets/svgs/calculator.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import {
  Container,
  IconsContainer,
  InfoContainer,
  ItemText,
  SubTitle,
  TextContainer,
  Title,
} from './styles';
import { CalcModel } from '../../../database/models/calcModel';
import { Kmod } from '../../../archive/4_WoodProperties/Kmod';
import ModalInfo from '../modalInfo';
import PopUpOneButton from '../../global/popUps/popUpOneButton';
import PopUpTwoButtons from '../../global/popUps/popUpTwoButtons';
import { database } from '../../../database';
import { NativeWoods } from '../../../archive/3_NativeWood/NativeWood';
import { NailDimensions } from '../../../archive/2_Dimensions/Pregos';
import New from '../../../assets/svgs/new.svg';

interface IProps {
  item: CalcModel;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

interface IData {
  wood_name: string;
  wood_resistance: string;
  charging: string;
  humidityClass: string;
  nail_name: string;
}

export default function CardCalc({ item, setRefresh }: IProps) {
  // Navegação
  const navigation = useNavigation();

  // Variáveis
  const [visibleModalInfo, setVisibleModalInfo] = useState(false);
  const [visibleModalDeleteQuest, setVisibleModalDeleteQuest] = useState(false);
  const [visibleModalDeleteSuccess, setVisibleModalDeleteSuccess] = useState(false);
  const [visibleModalError, setVisibleModalError] = useState(false)
  const [data, setData] = useState<IData>();

  // Buscar dados
  const GetData = useCallback(() => {
    console.log(item)
    const wood = NativeWoods.find((wood) => wood.id === item.woodName);
    const charging = Kmod.kmod1.find((wood) => wood.id === item.charging)?.name;
    const humidityClass = Kmod.kmod2.find(
      (wood) => wood.id === item.humidityClass,
    )?.name;
    const nail_name = NailDimensions.find(
      (nail) => nail.id === item.nailDimension,
    )?.name;

    setData({
      charging,
      humidityClass,
      nail_name,
      wood_name: wood?.name,
      wood_resistance: wood?.class,
    })
  }, []);

  useEffect(GetData, [GetData]);

  // Deletar cálculo
  async function DeleteCalc() {
    try {
      await database.write(async () => {
        const aux = await database.get<CalcModel>('calcs').find(item.id);

        await aux.destroyPermanently();
      });
      setVisibleModalDeleteSuccess(true);
    } catch (error) {
      setVisibleModalError(true);
    }
  }

  // Ir para mais informações
  async function OpenInfo() {
    try {
      await database.write(async () => {
        await item.update(() => {
          item.visualized_at = Number(new Date()) - 10800000;
        });
      });
      setVisibleModalInfo(true);
    } catch (error) {
      setVisibleModalError(true);
    }
  }

  // Ir para resultados
  async function Calc() {
    try {
      await database.write(async () => {
        await item.update(() => {
          item.visualized_at = Number(new Date()) - 10800000;
        });
      });
      navigation.dispatch(
        CommonActions.navigate('Result', { params: { id_calc: item.id } }),
      );
    } catch (error) {
      setVisibleModalError(true);
    }
  }

  return (
    <>
      <Container isNew={item.visualized_at === 0}>
        <ModalInfo
          visible={visibleModalInfo}
          setVisible={setVisibleModalInfo}
          item={item}
        />
        <PopUpOneButton
          visible={visibleModalDeleteSuccess}
          setVisible={setVisibleModalDeleteSuccess}
          message="Cálculo deletado com sucesso!"
          actionButton={() => {
            setRefresh(true);
            setVisibleModalDeleteSuccess(false);
          }}
          textButton="OK"
        />
        <PopUpOneButton
          visible={visibleModalError}
          setVisible={setVisibleModalError}
          message="Ops, ocorreu um erro. Tente novamente."
          actionButton={() => {
            setVisibleModalError(false);
          }}
          textButton="OK"
        />
        <PopUpTwoButtons
          visible={visibleModalDeleteQuest}
          setVisible={setVisibleModalDeleteQuest}
          message="Tem certeza de que deseja excluir esse cálculo?"
          rActionButton={() => {
            setVisibleModalDeleteQuest(false);
          }}
          rTextButton="Não"
          lActionButton={() => {
            setVisibleModalDeleteQuest(false);
            DeleteCalc();
          }}
          lTextButton="Sim"
        />
        <InfoContainer>
          {
            data ? <>
              <Title>{item.description}</Title>
              <SubTitle>{`${moment(new Date(item.created_at)).format('L')} - ${moment(new Date(item.created_at)).format('LT')}`}
              </SubTitle>
              <TextContainer>
                <ItemText>{`- Madeira ${data.wood_name};\n- Classe de resistência ${data.wood_resistance};\n- Carregamento ${data.charging};\n- Classe de Umidade ${data.humidityClass};\n- Prego ${data.nail_name};`}</ItemText>
              </TextContainer>
            </> : null
          }
        </InfoContainer>

        <IconsContainer>

          <TouchableOpacity
            onPress={() => {
              OpenInfo();
            }}
          >
            <Info />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setVisibleModalDeleteQuest(true);
            }}
          >
            <Trash />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              Calc();
            }}
          >
            <Calculator />
          </TouchableOpacity>

        </IconsContainer>

      </Container>
      {item.visualized_at === 0 ? (
        <New
          style={{ position: 'absolute', bottom: RFValue(16, 700) }}
          scale={1.5}
        />
      ) : null}
    </>
  );
}
