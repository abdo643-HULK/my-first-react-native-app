import React, { Component } from 'react';
import MySlider from './Slider';
import MyStepper from './Stepper';
import DateHeader from './DateHeader';

import { Text, View, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import TextBtn from './TextBtn';
import { submitEntry, removeEntry } from '../utils/api';

function SubmitBtn({ onPress }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text>Submit</Text>
		</TouchableOpacity>
	);
}

export default class AddEntry extends Component {
	state = {
		run: 0,
		bike: 0,
		swim: 0,
		sleep: 0,
		eat: 0,
	};

	increment = (metric) => {
		const { max, step } = getMetricMetaInfo(metric);
		this.setState((state) => {
			const count = state[metric] + step;

			return {
				...state,
				[metric]: count > max ? max : count,
			};
		});
	};

	decrement = (metric) => {
		const { step } = getMetricMetaInfo(metric);
		this.setState((state) => {
			const count = state[metric] - step;

			return {
				...state,
				[metric]: count < 0 ? 0 : count,
			};
		});
	};

	slide = (metric, value) => {
		this.setState(() => ({
			[metric]: value,
		}));
	};

	submit = () => {
		const key = timeToString();
		const entry = this.state;

		this.setState(() => ({
			run: 0,
			bike: 0,
			swim: 0,
			sleep: 0,
			eat: 0,
		}));

		submitEntry({ key, entry });
	};

	reset = () => {
		const key = timeToString();

		this.setState(() => ({
			run: 0,
			bike: 0,
			swim: 0,
			sleep: 0,
			eat: 0,
		}));

		removeEntry(key);
	};

	render() {
		const metaInfo = getMetricMetaInfo();
		if (this.props.logged) {
			return (
				<View>
					<Ionicons name="ios-happy-outline" size={100} />
					<Text>You already logged your information</Text>
					<TextBtn onPress={this.reset}>Reset</TextBtn>
				</View>
			);
		}

		return (
			<View>
				<DateHeader date={new Date().toLocaleDateString()} />
				{Object.keys(metaInfo).map((key) => {
					const { getIcon, type, ...rest } = metaInfo[key];
					const value = this.state[key];
					return (
						<View key={key}>
							{getIcon()}
							{type === 'slider' ? (
								<MySlider
									value={value}
									onChange={(value) => this.slide(key, value)}
									{...rest}
								/>
							) : (
								<MyStepper
									value={value}
									onIncrement={() => this.increment(key)}
									onDecrement={() => this.decrement(key)}
									{...rest}
								/>
							)}
						</View>
					);
				})}
				<SubmitBtn onPress={this.submit} />
			</View>
		);
	}
}
