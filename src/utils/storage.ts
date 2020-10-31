import Storage from '@react-native-community/async-storage';

const SCHEDULE_VERSION_KEY = 'SCHEDULE_VERSION_KEY';

export const setScheduleVersionAsync = async (version: string): Promise<void> =>
  await Storage.setItem(SCHEDULE_VERSION_KEY, version);

export const getScheduleVersionAsync = async (): Promise<string | null> =>
  await Storage.getItem(SCHEDULE_VERSION_KEY);
