import 'react-native-gesture-handler';
import React from 'react';

import { View, Platform, StatusBar } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AddEntry from './components/addEntry';
import { NavigationContainer } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History';
import { purple, white } from './utils/colors';
import { Constants } from 'expo';

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

export default function App() {
	return (
		<Provider store={createStore(reducer)}>
			<View style={{ flex: 1 }}>
				<AppStatusBar
					backgroundColor={purple}
					barStyle="light-content"
				/>
				<NavigationContainer initialRouteName="Add Entry">
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
					</Tab.Navigator>
				</NavigationContainer>
			</View>
		</Provider>
	);
}
