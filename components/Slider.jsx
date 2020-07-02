import React from 'react';
import { Text, View, Slider } from 'react-native';

export default function MySlider({ max, unit, step, value, onChange }) {
	return (
		<View>
			<Slider
				value={value}
				minimumValue={0}
				maximumValue={max}
				step={step}
				onValueChange={onChange}
			/>
			<View>
				<Text>{value}</Text>
				<Text>{unit}</Text>
			</View>
		</View>
	);
}
