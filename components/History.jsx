import React, { Component } from 'react';
import UdaciFitnessCalendar from 'udacifitness-calendar-fix';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchCalenderResults } from '../utils/api';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import entries from '../reducers';

class History extends Component {
	componentDidMount() {
		const { dispatch } = this.props;

		fetchCalenderResults()
			.then((entries) => dispatch(receiveEntries(entries)))
			.then(({ entries }) => {
				if (!entries[timeToString()]) {
					dispatch(
						addEntry({
							[timeToString()]: getDailyReminderValue(),
						})
					);
				}
			});
	}

	renderItem = ({ today, ...metrics }, formattedDate, key) => (
		<View>
			{today ? (
				<Text>{JSON.stringify(today)}</Text>
			) : (
				<Text>{JSON.stringify(metrics)}</Text>
			)}
		</View>
	);

	renderEmptyDate(formattedDate, key) {
		return (
			<View>
				<Text>No Data for this day</Text>
			</View>
		);
	}

	render() {
		const { entries } = this.props;
		return (
			<UdaciFitnessCalendar
				items={entries}
				renderItem={this.renderItem}
				renderEmptyDay={this.renderEmptyDate}
			/>
		);
	}
}

function mapStateToProps(entries) {
	return entries;
}

export default connect(mapStateToProps)(History);
