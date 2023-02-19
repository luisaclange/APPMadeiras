import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import calcDraw from './calcsDraw';
import { CalcModel } from '../../database/models/calcModel';
import { ContainerDraw } from './styles';
import ViewShot from 'react-native-view-shot';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppState, Dimensions, Image, Modal, View } from 'react-native';
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
	uri: string;
	setUri: Dispatch<SetStateAction<string>>;
}

export default function Draw({ data, pins, setUri, uri }: IProps) {

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

	// Excluir foto do cachê quando sai do aplicativo
	AppState.addEventListener('change', nextAppState => {
		if (nextAppState === 'inactive') excludeBeforeOut();
	});

	// Salvar na galeria
	const onSave = useCallback(async () => {
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
				console.error(JSON.stringify(error));
			});
		}
	}, [uri]);

	const setURI = useCallback(() => {
		ref?.current?.capture().then((uriViewShot: string) => {
			console.log(uriViewShot);
			setUri(uriViewShot);
		});
	}, []);

	// Abrir imagem
	const openImage = useCallback(() => {
		setVisibleImage(true);
	}, []);

	// Estilo
	const ContainerCapture = styled.View`
		align-items: center;
		width: ${calc.passThrough + 90}px;
		height: 100%;
		justify-content: center;
		backgroundColor: #FFFFFF;
	`;

	const Border = styled.View`
		background-color: black;
		padding: ${1}px;
		height: ${data.widthWood}px;
		flex: 1;
	`;

	const BackgroundImage = styled.ImageBackground`
		flex-direction: row;
		justify-content: center;
		height: 100%;
	`;

	const Pin = styled.View`
		height: ${calc.d}px;
		width: ${calc.d}px;
		border-width: ${1}px;
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
		height: ${calc.bfVertical - calc.d / 2 - 1}px;
	`;

	const ColumnSpecial = styled.View``;

	const BorderFreeSpecial = styled.View`
		height: ${calc.bfVerticalSpecial - calc.d / 2 - 1}px;
	`;

	const MarginHorizontalRight = styled.View`
		border-right-width: ${1}px;
		height: 100%;
		width: ${calc.bfHorizontal - calc.d / 2 + 1}px;
		margin-right: ${20}px;
	`;

	const MarginHorizontalLeft = styled.View`
		border-left-width: ${1}px;
		border-style: dashed;
		height: 100%;
		width: ${calc.bfHorizontal - calc.d / 2 + 1}px;
		margin-left: ${20}px;
	`;

	const CotaTop = styled.View`
		margin-bottom: ${2}px;
		margin-left: ${calc.bfHorizontal}px;
		border-left-width: ${1}px;
		flex-direction: row;
	`;

	const CotaLeft = styled.View`
		margin-right: ${2}px;
		border-bottom-width: ${1}px;
		margin-left: ${16}px;
	`;

	const CotaRight = styled.View`
		margin-left: ${2}px;
		border-bottom-width: ${1}px;
		margin-right: ${16}px;
	`;

	const CotaBottom = styled.View`
		margin-top: ${2}px;
		border-left-width: ${1}px;
		border-right-width: ${1}px;
		flex-direction: row;
	`;

	const CotaMarginHorizontal = styled.View`
		border-right-width: ${1}px;
		border-top-width: ${1}px;
		width: ${calc.bfHorizontal}px;
		height: ${10}px;
	`;

	const CotaMarginBottom = styled.View`
		border-horizontal-width: ${1}px;
		border-bottom-width: ${1}px;
		width: ${calc.passThrough}px;
		height: ${10}px;
	`;

	const CotaSpaceHorizontal = styled.View`
		border-right-width: ${1}px;
		border-top-width: ${1}px;
		width: ${calc.spaceColumns}px;
		height: ${10}px;
	`;

	const CotaSpaceVerticalSpecial = styled.View`
		border-left-width: ${1}px;
		border-top-width: ${1}px;
		height: ${calc.spaceSpecialColumnPins}px;
		width: ${10}px;
	`;

	const CotaSpaceVerticalNormal = styled.View`
		border-right-width: ${1}px;
		border-top-width: ${1}px;
		height: ${calc.spaceNormalColumnPins}px;
		width: ${10}px;
	`;

	const CotaBorderFreeSpecial = styled.View`
		border-left-width: ${1}px;
		border-top-width: ${1}px;
		height: ${calc.bfVerticalSpecial}px;
		width: ${10}px;
	`;

	const CotaBorderFreeNormal = styled.View`
		border-right-width: ${1}px;
		border-top-width: ${1}px;
		height: ${calc.bfVertical}px;
		width: ${10}px;
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
		font-size: ${10}px;
		position: absolute;
		bottom: ${10}px;
	`;

	const CotaTextBottom = styled.Text`
		font-size: ${10}px;
		position: absolute;
		bottom: -${12}px;
	`;

	const CotaTextVerticalLeft = styled.Text`
		font-size: ${10}px;
		position: absolute;
		right: ${11}px;
	`;

	const CotaTextVerticalRight = styled.Text`
		font-size: ${10}px;
		position: absolute;
		left: ${11}px;
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
			<ContainerDraw onPress={openImage}>
				{!loading && (
					<>
						{
							!uri ?
								<ViewShot ref={ref} options={{ quality: 1 }}>
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
													<CotaTextVerticalLeft>{calc.bfVerticalSpecial}</CotaTextVerticalLeft>
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
													<CotaTextVerticalLeft>{calc.bfVerticalSpecial}</CotaTextVerticalLeft>
													<CotaBorderFreeSpecial />
												</CotaItemVertical>
											</CotaLeft>

											<Border>
												<BackgroundImage source={require('../../assets/images/Detalhamento.jpg')} onLoadEnd={setURI}>
													<MarginHorizontalLeft />
													<ColumnSpecial>
														<BorderFreeSpecial />
														{calc.nPinsSpecialColumn > 0 && (
															<>
																<Pin key={'specialPin'} />
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
																{[...Array(calc.nPinsColumn - 1)].map((item, index) => {
																	return (
																		<>
																			<SpaceVerticalNormal key={`spacenormal${index}`} />
																			<Pin key={`pin${index}`} />
																		</>
																	);
																})}
																<BorderFreeNormal />
															</ColumnNormal>
														);
													})}
													<MarginHorizontalRight />
												</BackgroundImage>
											</Border>

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
								: <Image source={{ uri }} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
						}
					</>
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
									}}
									blackBorder
								/>
							</View>
						);
					}}
					enableImageZoom
				/>
			</Modal>
			<ButtonDark
				text='Salvar na galeria'
				onPress={() => {
					onSave();
				}}
			/>
		</>
	);
}
