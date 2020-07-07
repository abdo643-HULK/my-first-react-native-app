import 'react-native-gesture-handler';
import React from 'react';

import { View, Platform, StatusBar } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AddEntry from './components/addEntry';
import { NavigationContainer } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History';
import { purple, white } from './utils/colors';
import { Constants } from 'expo';
import EntryDetail from './components/EntryDetail';
import Live from './components/Live';

function AppStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar
				translucent
				backgroundColor={backgroundColor}
				{...props}
			/>
		</View>
	);
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabConfig = {
	tabBarOptions: {
		activeTintColor: Platform.OS === 'ios' ? purple : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === 'ios' ? white : purple,
			shadowColor: 'rgba(0,0,0,0.24)',
			shadowOffset: {
				width: 0,
				height: 5,
			},
			shadowRadius: 6,
			shadowOpacity: 1,
		},
	},
};

function Tabs() {
	return (
		<Tab.Navigator tabBarOptions={tabConfig.tabBarOptions}>
			<Tab.Screen
				name="AddEntry"
				component={AddEntry}
				options={{
					tabBarLabel: 'Add Entry',
					tabBarIcon: ({ tintColor }) => (
						<FontAwesome
							name="plus-square"
							color={tintColor}
							size={30}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="History"
				component={History}
				options={{
					tabBarLabel: 'History',
					tabBarIcon: ({ tintColor }) => (
						<Ionicons
							name="ios-bookmarks"
							color={tintColor}
							size={30}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Live"
				component={Live}
				options={{
					tabBarLabel: 'Live',
					tabBarIcon: ({ tintColor }) => (
						<Ionicons
							name="ios-speedometer"
							color={tintColor}
							size={30}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

function MainNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Tabs} />
			<Stack.Screen
				name="EntryDetail"
				component={EntryDetail}
				options={{
					headerTintColor: white,
					headerStyle: {
						purple,
					},
				}}
			/>
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<Provider store={createStore(reducer)}>
			<View style={{ flex: 1 }}>
				<AppStatusBar
					backgroundColor={purple}
					barStyle="light-content"
				/>
				<NavigationContainer>
					<MainNavigator />
				</NavigationContainer>
			</View>
		</Provider>
	);
}
