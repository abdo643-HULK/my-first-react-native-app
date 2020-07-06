import { AsyncStorage } from 'react-native';
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar';

export async function fetchCalenderResults() {
	const res = await AsyncStorage.getItem(CALENDAR_STORAGE_KEY);
	return formatCalendarResults(res);
}

export function submitEntry({ entry, key }) {
	return AsyncStorage.mergeItem(
		CALENDAR_STORAGE_KEY,
		JSON.stringify({
			[key]: entry,
		})
	);
}

export async function removeEntry(key) {
	const results = await AsyncStorage.getItem(CALENDAR_STORAGE_KEY);
	const data = JSON.parse(results);
	data[key] = undefined;
	delete data[key];
	AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
}
