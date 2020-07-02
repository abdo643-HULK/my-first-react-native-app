import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

export default function MyStepper({
	max,
	unit,
	step,
	value,
	onIncrement,
	onDecrement,
}) {
	return (
		<View>
			<View>
				<TouchableOpacity onPress={onDecrement}>
					<FontAwesome name="minus" size={30} color={'black'} />
				</TouchableOpacity>
				<TouchableOpacity onPress={onIncrement}>
					<FontAwesome name="plus" size={30} color={'black'} />
				</TouchableOpacity>
			</View>
			<View>
				<Text>{value}</Text>
				<Text>{unit}</Text>
			</View>
		</View>
	);
}
