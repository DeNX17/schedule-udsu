import React, {FC, useEffect} from 'react';
import {View, Text} from 'react-native';
import {downloadScheduleAsync} from './utils/download-schedule';
import {getScheduleLinkAsync} from './utils/get-schedule-link';
import {getScheduleVersionAsync} from './utils/storage';

export const App: FC = () => {
  useEffect(() => {
    const handleFetchAsync = async () => {
      const scheduleLink = await getScheduleLinkAsync();

      const lastScheduleVersion = await getScheduleVersionAsync();

      if (
        !lastScheduleVersion ||
        scheduleLink.version !== lastScheduleVersion
      ) {
        downloadScheduleAsync(scheduleLink);
      }
    };

    handleFetchAsync();
  }, []);

  return (
    <View>
      <Text>Main page</Text>
    </View>
  );
};
