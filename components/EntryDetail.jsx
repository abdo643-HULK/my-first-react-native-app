import React from 'react';
import { View, Platform, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MetricCard from './MetricCard';
import { addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { removeEntry } from '../utils/api';
import TextBtn from './TextBtn';

class EntryDetail extends React.Component {
	static navOptions = ({ navigation }) => {
		const { entryId } = navigation.state.params;
		const year = entryId.slice(0, 4);
		const month = entryId.slice(5, 7);
		const day = entryId.slice(8);

		return {
			title: `${month}/${day}/${year}`,
		};
	};

	shouldComponentUpdate(nextProp) {
		return nextProp.metrics !== null && !nextProp.metrics.today;
	}

	reset = () => {
		const { remove, goBack, entryId } = this.props;

		remove();
		goBack();
		removeEntry(entryId);
	};

	render() {
		const { metrics } = this.props;
		return (
			<View style={styles.container}>
				<MetricCard metrics={metrics} />
				<TextBtn onPress={this.reset} style={{ margin: 20 }}>
					RESET
				</TextBtn>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		padding: 15,
	},
});

function mapStateToProps(state, { naviagtion }) {
	const { entryId } = navigation.state.params;

	return {
		entryId,
		metrics: state[entryId],
	};
}

function mapDispatchToProps(dispatch, { naviagtion }) {
	const { entryId } = navigation.state.params;

	return {
		remove: () =>
			dispatch(
				addEntry({
					[entryId]:
						timeToString() === entryId
							? getDailyReminderValue()
							: null,
				})
			),
		goBack: () => naviagtion.goBack(),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
