import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';

//Componente de timer
function Timer({ interval }) {
	const duration = moment.duration(interval);
	return (
		<Text style={styles.timer}> 
			{duration.minutes()}:{duration.seconds()}
		</Text>
	);
}

//Componente de timer
function Timer({ interval }) {
	const duration = moment.duration(interval);
	return (
		<Text style={styles.info}> 
			Tiempo: {duration.minutes()}:{duration.seconds()}
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
function Price({ cents }) {
	const pesos = cents/100;
	return (
		<Text style={styles.price}> 
			${pesos}
		</Text>
	);
}

//Componente de boton redondo
function RoundButton({ title, color, background, onPress, disabled}) {
	return (
		//Lo hace semitransparente al presionar
		<TouchableOpacity
			//onPress = {() => !disabled && onPress}
			onPress={onPress}
			activeOpacity = {disabled ? 1 : 0.3}
			style={[ styles.button, { backgroundColor: background }]}
		>
			<Text style={[ styles.buttonTitle, {color}]}> {title} </Text>
		</TouchableOpacity>
	);
}

//Componente de boton redondo
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
			start: 0, //Tiempo de inicio del timer, ms
			now: 0, //Tiempo actual, ms
			distance: 0, //metros
			cents: 0, //centavos de peso
		}
	}

	comenzar = () => {
		const now = new Date().getTime()
		this.setState({
			start: now,
			now: now,
		})
		console.log('entree ')
		this.timer = setInterval( () => {
			this.setState({ now: new Date().getTime()})
		}, 1000)
	}

	render() {
		const {now, start, distance, cents} = this.state;
		const timer = now - start;
		return (
				<View style={styles.container}>
					<Price cents={cents}/>

					<InformationRow>
						<Timer interval={timer}/>
						<Distance distance={distance}/>
					</InformationRow>

					<RoundButton 
						title='Start'
						color='#50D167'
						background='#1B361F'
						onPress={this.comenzar}
						disabled='false'
					/>
				</View>
		);
	}
};

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
		width: 80,
		height: 80,
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonTitle: {
		fontSize: 20,
	},
	informationRow: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'space-between',
		marginTop: 50,
	}
});
