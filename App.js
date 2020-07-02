import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddEntry from './components/addEntry';

export default function App() {
	return (
		<View>
			<Ionicons name="ios-pizza" color="red" size={100} />
			<AddEntry />
		</View>
	);
}
