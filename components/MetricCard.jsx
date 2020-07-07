import React, { Component } from 'react';
import DateHeader from './DateHeader';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { gray } from '../utils/colors';
import { getMetricMetaInfo } from '../utils/helpers';

export default function MetricCard({ date, metrics }) {
	return (
		<View>
			{date && <DateHeader date={date} />}
			{Object.keys(metrics).map((metric) => {
				const {
					getIcon,
					displayName,
					unit,
					backgroundColor,
				} = getMetricMetaInfo(metric);
				return (
					<View style={styles.metric}>
						{getIcon()}
						<View>
							<Text style={{ fontSize: 20 }}>{displayName}</Text>
							<Text style={{ fontSize: 16, color: gray }}>
								{metrics[metric]} {unit}
							</Text>
						</View>
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	metric: {
		flexDirection: 'row',
		marginTop: 12,
	},
});
