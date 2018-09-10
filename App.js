import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';

//Componente de timer
function Timer({ interval }) {
	const duration = moment.duration(interval)
	return (
		<Text style={styles.timer}>
			{duration.minutes()}:{duration.seconds()}
		</Text>
	);
}

//Componente de timer
function Timer({ interval }) {
	const pad = (n) => n < 10 ? '0' + n : n
	const duration = moment.duration(interval)
	return (
		<Text style={styles.info}> 
			Tiempo: {pad(duration.minutes())}:{pad(duration.seconds())}
		</Text>
	);
}

//Componente de distancia
function Distance({ distance }) {
	return (
		<Text style={styles.info}> 
			Distancia: {distance}
		</Text>
	);
}

//Componente de precio
function Price({ start, tiempo, distancia }) {
	const base = 3260
	const precioTiempo = moment.duration(tiempo).minutes()*326
	const precioDistancia = 0
	const pesos = start ? (base+precioTiempo+precioDistancia)/100 : 0
	return (
		<Text style={styles.price}> 
			${pesos}
		</Text>
	);
}

//Componente de boton redondo
function RoundButton({ title, color, background, onPress}) {
	return (
		//Lo hace semitransparente al presionar
		<TouchableOpacity
			onPress={onPress}
			activeOpacity = {0.3}
			style={[ styles.button, { backgroundColor: background }]}
		>
			<Text style={[ styles.buttonTitle, {color}]}> {title} </Text>
		</TouchableOpacity>
	);
}

//Componente de lista de boton redondo
function RoundButtonRow({ children }) {
	return (
		<View style={ styles.roundButtonRow }>
		{children}
		</View>
	);
}


//Componente de lista de info
function InformationRow({ children }) {
	return (
		<View style={ styles.informationRow }>
		{children}
		</View>
	);
}


export default class App extends Component {
	constructor(props) {
		super(props);
		//Lo que esta aca actualiza el render cuando se modifica
		this.state = {
			name: 'idle',
			start: 0, //Tiempo de inicio del timer, ms
			now: 0, //Tiempo actual, ms
			distance: 0, //metros
			cents: 0, //centavos de peso
		}
	}

	comenzar = () => {
		const now = new Date().getTime()
		this.setState({
			name: 'running',
			start: now,
			now: now,
		})
		console.log('Arranca ')
		this.timer = setInterval( () => {
			this.setState({ now: new Date().getTime()})
		}, 1000)
	}

	continuar = () => {
		const now = new Date().getTime()
		this.setState({
			name: 'running',
			now: now,
		})
		console.log('Continuar')
		this.timer = setInterval( () => {
			this.setState({ now: new Date().getTime()})
		}, 1000)
	}


	detener = () => {
		this.setState({
			name: 'stopped',
		})
		console.log('detengo ')
		clearInterval(this.timer)
	}

	limpiar = () => {
		const now = new Date().getTime()
		this.setState({
			name: 'idle',
			start: 0,
			now: 0,
		})
		console.log('Limpio')
	}

	render() {
		const {name, now, start, distance, cents} = this.state;
		const timer = now - start;
		return (
				<View style={styles.container}>
					<Price start={!!now} tiempo={timer} distancia={distance}/>

					<InformationRow>
						<Timer interval={timer}/>
						<Distance distance={distance}/>
					</InformationRow>

					{name == 'idle' && (
						<RoundButton 
							title='Comenzar'
							color='#50D167'
							background='#1B361F'
							onPress={this.comenzar}
						/>
					)}
					{name == 'running' && (
						<RoundButton 
							title='Detener'
							color='#e33935'
							background='#3c1715'
							onPress={this.detener}
						/>
					)}
					{name == 'stopped' && (
						<RoundButtonRow>
							<RoundButton
								title='Continuar'
								color='#50D167'
								background='#1B361F'
								onPress={this.continuar}
							/>
							<RoundButton 
								title='Limpiar'
								color='#FFFFFF'
								background='#3d3d3d'
								onPress={this.limpiar}
							/>
						</RoundButtonRow>
					)}
				</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0D0D0D',
		alignItems: 'center',
		paddingTop: 130,
		paddingHorizontal: 30,
	},
	price: {
		color: '#FFFFFF',
		fontSize: 70,
		fontWeight: '100',
	},
	info: {
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '100',
	},
	button: {
		width: 120,
		height: 120,
		borderRadius: 60,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 50,
	},
	buttonTitle: {
		fontSize: 20,
	},
	informationRow: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'space-between',
		marginTop: 50,
	},
	roundButtonRow: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'space-between',
	}
})
