import moment from 'moment';
import 'moment/locale/pt-br';
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import Trash from '../../../assets/svgs/trash.svg';
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
import { Kmod } from '../../../archive/NBRTables/WoodProperties/Kmod';
import PopUpOneButton from '../../global/popUps/popUpOneButton';
import PopUpTwoButtons from '../../global/popUps/popUpTwoButtons';
import { database } from '../../../database';
import { NativeWoods } from '../../../archive/NBRTables/NativeWood/NativeWood';
import { PregoDimensions } from '../../../archive/PinsDimensions/Nails';
import New from '../../../assets/svgs/new.svg';
import { ParafusoPassanteDimensions } from '../../../archive/PinsDimensions/ThroughScrews';
import { ParafusoSoberbaDimensions } from '../../../archive/PinsDimensions/SuperbScrews';

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
	const [visibleModalDeleteQuest, setVisibleModalDeleteQuest] =
		useState(false);
	const [visibleModalDeleteSuccess, setVisibleModalDeleteSuccess] =
		useState(false);
	const [visibleModalError, setVisibleModalError] = useState(false);
	const [data, setData] = useState<IData>();

	// Buscar dados
	const GetData = useCallback(() => {
		const wood = NativeWoods.find(wood => wood.id === item.woodName);
		const charging = Kmod.kmod1.find(
			wood => wood.id === item.charging,
		)?.name;
		const humidityClass = Kmod.kmod2.find(
			wood => wood.id === item.humidityClass,
		)?.name;
		let nail_name = '';
		switch (item.nailType) {
			case 'prego':
				nail_name = PregoDimensions.find(
					nail => nail.id === item.nailDimension,
				)?.name;
				break;
			case 'parafusoPassante':
				nail_name = ParafusoPassanteDimensions.find(
					nail => nail.id === item.nailDimension,
				)?.name;
				break;
			case 'parafusoSoberba':
				nail_name = ParafusoSoberbaDimensions.find(
					nail => nail.id === item.nailDimension,
				)?.name;
				break;
			default:
				nail_name = null;
				break;
		}

		setData({
			charging,
			humidityClass,
			nail_name,
			wood_name: wood?.name,
			wood_resistance: wood?.class,
		});
	}, []);

	useEffect(GetData, [GetData]);

	// Deletar cálculo
	async function DeleteCalc() {
		try {
			await database.write(async () => {
				const aux = await database
					.get<CalcModel>('calcs')
					.find(item.id);

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
			navigation.dispatch(
				CommonActions.navigate('MoreInfo', {
					params: { id_calc: item.id },
				}),
			);
		} catch (error) {
			setVisibleModalError(true);
		}
	}

	return (
		<>
			<Container isNew={item.visualized_at === 0} onPress={OpenInfo}>
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
					{data ? (
						<>
							<Title>{item.description}</Title>
							<SubTitle>
								{`${moment(new Date(item.created_at)).format(
									'L',
								)} - ${moment(new Date(item.created_at)).format(
									'LT',
								)}`}
							</SubTitle>
							<TextContainer>
								<ItemText>{`- Madeira ${data.wood_name};\n- Classe de resistência ${data.wood_resistance};\n- Carregamento ${data.charging};\n- Classe de Umidade ${data.humidityClass};\n- ${data.nail_name};`}</ItemText>
							</TextContainer>
						</>
					) : null}
				</InfoContainer>

				<IconsContainer>
					<TouchableOpacity
						onPress={() => {
							setVisibleModalDeleteQuest(true);
						}}
					>
						<Trash />
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
