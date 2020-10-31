import React, {FC, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {downloadScheduleAsync} from './utils/download-schedule';
import {getScheduleLinkAsync} from './utils/get-schedule-link';
import {LoadingStatusEnum} from './utils/loading-status.enum';
import {
  getSchedulePathAsync,
  getScheduleVersionAsync,
  setSchedulePathAsync,
} from './utils/storage';

const android = RNFetchBlob.android;

export const App: FC = () => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusEnum | null>(
    null,
  );

  const openFile = (path: string): void => {
    setLoadingStatus(LoadingStatusEnum.OPENING);

    path && android.actionViewIntent(path, 'application/vnd.ms-excel');
  };

  useEffect(() => {
    const handleFetchAsync = async () => {
      setLoadingStatus(LoadingStatusEnum.GETTING_LINK);

      const scheduleLink = await getScheduleLinkAsync();

      const lastScheduleVersion = await getScheduleVersionAsync();

      if (
        !lastScheduleVersion ||
        scheduleLink.version !== lastScheduleVersion
      ) {
        setLoadingStatus(LoadingStatusEnum.DOWNLOADING);
        const path = await downloadScheduleAsync(scheduleLink);

        await setSchedulePathAsync(path);

        path && openFile(path);
      } else {
        const path = await getSchedulePathAsync();

        path && openFile(path);
      }
    };

    handleFetchAsync();
  }, []);

  return (
    <View>
      <Text>Schedule UDSU</Text>
      <Text>STATUS: {loadingStatus}</Text>
    </View>
  );
};
