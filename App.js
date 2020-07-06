import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddEntry from './components/addEntry';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History';

export default function App() {
	return (
		<Provider store={createStore(reducer)}>
			<View style={{ flex: 1 }}>
				{/* <Ionicons name="ios-pizza" color="red" size={100} /> */}
				{/* <AddEntry /> */}
				<View style={{ height: 20 }} />
				<History />
			</View>
		</Provider>
	);
}
