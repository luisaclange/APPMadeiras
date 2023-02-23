import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../../components/global/header';
import {
	ButtonContainer,
	Container,
	ImageCorte,
	Subtitle,
	TextContact,
	TextInfo,
	Title,
} from './styles';
import ButtonDark from '../../components/global/buttons/buttonDark';
import { useNavigation } from '@react-navigation/native';
import ScreenView from '../../components/global/screenView';

export default function About() {
	// Navegação
	const navigation = useNavigation();

	return (
		<ScreenView>
			<Header title="Sobre" />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<Container>
					<Title>Magali</Title>
					<Subtitle>Aplicativo de dimensionamento de ligações em madeira</Subtitle>

					<TextInfo>
						Esse aplicativo foi desenvolvido como Trabalho de Conclusão de Curso para a obtenção de bacharel em Engenharia Civil pela Universidade Tecnológica Federal do Paraná - UTFPR, campus Toledo.
					</TextInfo>

					<TextInfo>
						Seu propósito é o dimensionamento de ligações em madeira de floresta nativa, utilizando pinos metálicos. Essa ligação pode ser feita utilizando duas ou três peças em madeira, dispostas paralelamente às fibras, ligadas por pregos, parafusos passantes ou parafusos de rosca soberba (o aplicativo possui algumas peças comerciais cadastradas, porém é possível o cadastro pelo usuário destas peças). Logo, a disposição das peças seria como as figuras abaixo:
					</TextInfo>

					<ImageCorte
						source={require('../../assets/images/cortes/cortesimples.png')}
						resizeMode={'center'}
					/>

					<ImageCorte
						source={require('../../assets/images/cortes/corteduplo.png')}
						resizeMode={'center'}
					/>

					<TextInfo>
						Com ele é possível determinar o número de pinos metálicos e força máxima resistida por essa ligação, gerando o detalhamento desta e especificando o espaçamento entre os pinos conforme os valores das peças de madeira fornecidas.
					</TextInfo>

					<TextInfo>
						Todos os cálculos são baseados na NBR 7190 (2022): Projeto de estruturas de madeira. Em caso de dúvidas, sugestões e erros no aplicativo, enviar um e-mail para o contato abaixo:
					</TextInfo>

					<TextContact>Luisa Lange</TextContact>
					<TextContact>luisalange@alunos.utfpr.edu.br</TextContact>
				</Container>
			</ScrollView>
			<ButtonContainer>
				<ButtonDark
					text="Voltar"
					onPress={() => {
						navigation.goBack();
					}}
				/>
			</ButtonContainer>
		</ScreenView>
	);
}
