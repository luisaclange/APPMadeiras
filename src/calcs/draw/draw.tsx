import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import calcDraw from './calcsDraw';
import { CalcModel } from '../../database/models/calcModel';
import { ContainerCapture, ContainerDraw } from './styles';
import ViewShot from 'react-native-view-shot';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions, Modal, View } from 'react-native';
import ButtonDark from '../../components/global/buttons/buttonDark';
import ImageViewer from 'react-native-image-zoom-viewer';
import ButtonLight from '../../components/global/buttons/buttonLight';
import * as FileSystem from 'expo-file-system';
import CameraRoll from '@react-native-community/cameraroll';
import PopUpOneButton from '../../components/global/popUps/popUpOneButton';
import * as ImagePicker from 'expo-image-picker';

interface IProps {
	data: CalcModel | Record<string, never>;
	pins: number;
}

export default function Draw({ data, pins }: IProps) {

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
		d: 0,
		passThrough: 0
	});
	const [loading, setLoading] = useState(true);
	const [uri, setUri] = useState('');
	const [visibleImage, setVisibleImage] = useState(false);
	const [visibleSuccess, setVisibleSuccess] = useState(false);
	const ref = useRef();

	// Buscar dados
	const GetData = useCallback(async () => {
		setCalc(await calcDraw({ pins, data }));
		setLoading(false);
	}, [data, pins]);

	useEffect(() => {
		GetData();
	}, [GetData]);

	// Excluir imagem ao sair
	const excludeBeforeOut = () => {
		FileSystem.deleteAsync(uri).then(() => {
			setUri('');
			console.log('arquivo excluído');
		}).catch(error => {
			console.error(error);
		});
	};

	// Salvar na galeria
	const onSave = useCallback(() => {
		ref?.current?.capture().then(async uri => {
			let permissionCamera = await ImagePicker.getCameraPermissionsAsync();
			if (!permissionCamera.granted) {
				permissionCamera = await ImagePicker.requestCameraPermissionsAsync();
			}

			let permissionLibrary = await ImagePicker.getMediaLibraryPermissionsAsync();
			if (!permissionLibrary.granted) {
				permissionLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync();
			}

			if (permissionCamera.granted && permissionLibrary.granted) {
				CameraRoll.save(uri, { type: 'photo' }).then(() => {
					setVisibleSuccess(true);
				}).catch(error => {
					console.error(error);
				});
			}
		});
	}, []);

	// Abrir imagem
	const openImage = useCallback(() => {
		ref?.current?.capture().then(uri => {
			setUri(uri);
			setVisibleImage(true);
		});
	}, [setUri]);

	// Escala
	const scale = ((calc.passThrough + 90) / (Dimensions.get('screen').width - 48)) * 700;

	// Estilo
	const BackgroundImage = styled.ImageBackground`
		height: ${RFValue(data.widthWood, scale)}px;
		flex-direction: row;
		justify-content: center;
		flex: 1;
		border-top-width: ${RFValue(1, scale)}px;
		border-bottom-width: ${RFValue(1, scale)}px;
	`;

	const Pin = styled.View`
		height: ${RFValue(calc.d, scale)}px;
		width: ${RFValue(calc.d, scale)}px;
		border-width: ${RFValue(1, scale)}px;
		background-color: grey;
		border-radius: ${RFValue(calc.d / 2, scale)}px;
	`;

	const SpaceVerticalNormal = styled.View`
		height: ${RFValue(calc.spaceNormalColumnPins - calc.d, scale)}px;
	`;

	const SpaceVerticalSpecial = styled.View`
		height: ${RFValue(calc.spaceSpecialColumnPins - calc.d, scale)}px;
	`;

	const ColumnNormal = styled.View`
		margin-left: ${RFValue(calc.spaceColumns - calc.d, scale)}px;
	`;

	const BorderFreeNormal = styled.View`
		height: ${RFValue(calc.bfVertical - calc.d / 2, scale)}px;
	`;

	const ColumnSpecial = styled.View``;

	const BorderFreeSpecial = styled.View`
		height: ${RFValue(calc.bfVerticalSpecial - calc.d / 2, scale)}px;
	`;

	const MarginHorizontalRight = styled.View`
		border-right-width: ${RFValue(1, scale)}px;
		height: 100%;
		width: ${RFValue(calc.bfHorizontal - calc.d / 2, scale)}px;
		margin-right: ${RFValue(20, scale)}px;
	`;

	const MarginHorizontalLeft = styled.View`
		border-left-width: ${RFValue(1, scale)}px;
		border-style: dashed;
		height: 100%;
		width: ${RFValue(calc.bfHorizontal - calc.d / 2, scale)}px;
		margin-left: ${RFValue(20, scale)}px;
	`;

	const CotaTop = styled.View`
		margin-bottom: ${RFValue(2, scale)}px;
		margin-left: ${RFValue(calc.bfHorizontal - calc.d / 2, scale)}px;
		border-left-width: ${RFValue(1, scale)}px;
		flex-direction: row;
	`;

	const CotaLeft = styled.View`
		margin-right: ${RFValue(2, scale)}px;
		border-bottom-width: ${RFValue(1, scale)}px;
		margin-left: ${RFValue(16, scale)}px;
	`;

	const CotaRight = styled.View`
		margin-left: ${RFValue(2, scale)}px;
		border-bottom-width: ${RFValue(1, scale)}px;
		margin-right: ${RFValue(16, scale)}px;
	`;

	const CotaBottom = styled.View`
		margin-top: ${RFValue(2, scale)}px;
		border-left-width: ${RFValue(1, scale)}px;
		border-right-width: ${RFValue(1, scale)}px;
		flex-direction: row;
	`;

	const CotaMarginHorizontal = styled.View`
		border-right-width: ${RFValue(1, scale)}px;
		border-top-width: ${RFValue(1, scale)}px;
		width: ${RFValue(calc.bfHorizontal, scale)}px;
		height: ${RFValue(10, scale)}px;
	`;

	const CotaMarginBottom = styled.View`
		border-horizontal-width: ${RFValue(1, scale)}px;
		border-bottom-width: ${RFValue(1, scale)}px;
		width: ${RFValue(calc.passThrough, scale)}px;
		height: ${RFValue(10, scale)}px;
	`;

	const CotaSpaceHorizontal = styled.View`
		border-right-width: ${RFValue(1, scale)}px;
		border-top-width: ${RFValue(1, scale)}px;
		width: ${RFValue(calc.spaceColumns, scale)}px;
		height: ${RFValue(10, scale)}px;
	`;

	const CotaSpaceVerticalSpecial = styled.View`
		border-left-width: ${RFValue(1, scale)}px;
		border-top-width: ${RFValue(1, scale)}px;
		height: ${RFValue(calc.spaceSpecialColumnPins, scale)}px;
		width: ${RFValue(10, scale)}px;
	`;

	const CotaSpaceVerticalNormal = styled.View`
		border-right-width: ${RFValue(1, scale)}px;
		border-top-width: ${RFValue(1, scale)}px;
		height: ${RFValue(calc.spaceNormalColumnPins, scale)}px;
		width: ${RFValue(10, scale)}px;
	`;

	const CotaBorderFreeSpecial = styled.View`
		border-left-width: ${RFValue(1, scale)}px;
		border-top-width: ${RFValue(1, scale)}px;
		height: ${RFValue(calc.bfVerticalSpecial, scale)}px;
		width: ${RFValue(10, scale)}px;
	`;

	const CotaBorderFreeNormal = styled.View`
		border-right-width: ${RFValue(1, scale)}px;
		border-top-width: ${RFValue(1, scale)}px;
		height: ${RFValue(calc.bfVertical, scale)}px;
		width: ${RFValue(10, scale)}px;
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
		font-size: ${RFValue(10, scale)}px;
		position: absolute;
		bottom: ${RFValue(10, scale)}px;
	`;

	const CotaTextBottom = styled.Text`
		font-size: ${RFValue(10, scale)}px;
		position: absolute;
		bottom: -${RFValue(12, scale)}px;
	`;

	const CotaTextVerticalLeft = styled.Text`
		font-size: ${RFValue(10, scale)}px;
		position: absolute;
		right: ${RFValue(11, scale)}px;
	`;

	const CotaTextVerticalRight = styled.Text`
		font-size: ${RFValue(10, scale)}px;
		position: absolute;
		left: ${RFValue(11, scale)}px;
	`;

	const Center = styled.View`
		width: 100%;
		flex-direction: row;
	`;

	return (
		<>
			<PopUpOneButton
				actionButton={() => {
					setVisibleSuccess(false);
				}}
				message='Imagem adicionada em sua galeria!'
				setVisible={setVisibleSuccess}
				textButton='OK'
				visible={visibleSuccess}
			/>
			<ContainerDraw>
				{!loading && (
					<ViewShot ref={ref}>
						<ContainerCapture onPress={openImage}>
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
									<MarginHorizontalLeft />
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
									<MarginHorizontalRight />
								</BackgroundImage>

								<CotaRight>
									<CotaItemVertical>
										<CotaTextVerticalRight>{calc.bfVertical}</CotaTextVerticalRight>
										<CotaBorderFreeNormal />
									</CotaItemVertical>
									{[...Array(calc.nPinsColumn - 1)].map(
										(item, index) => {
											return (
												<CotaItemVertical key={`cotaSpaceRight${index}`}>
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

							<CotaBottom>
								<CotaItemHorizontal>
									<CotaTextBottom>{calc.passThrough}</CotaTextBottom>
									<CotaMarginBottom />
								</CotaItemHorizontal>
							</CotaBottom>
						</ContainerCapture>
					</ViewShot>
				)}
			</ContainerDraw>
			<Modal visible={visibleImage} transparent style={{ height: Dimensions.get('window').height }} statusBarTranslucent>
				<ImageViewer
					imageUrls={[{ url: uri }]}
					style={{ flexGrow: 1 }}
					renderFooter={() => {
						return (
							<View style={{ width: Dimensions.get('screen').width, padding: RFValue(16, 700), marginBottom: RFValue(16, 700) }}>
								<ButtonLight
									text='Fechar'
									onPress={() => {
										setVisibleImage(false);
										excludeBeforeOut();
									}}
								/>
							</View>
						);
					}}
					enableImageZoom
				/>
			</Modal>
			<ButtonDark
				text='Salvar na galeria'
				onPress={onSave}
			/>
		</>
	);
}
