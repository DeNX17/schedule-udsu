import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {setScheduleVersionAsync} from './storage';

export const downloadScheduleAsync = async ({
  link,
  version,
}: ScheduleLinkI): Promise<string> => {
  await setScheduleVersionAsync(version);

  const {config, fs} = RNFetchBlob;

  let DownloadDir = fs.dirs.DownloadDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: `${DownloadDir}/scheduleUdsu${version}`,
      description: 'Downloading schedule.',
    },
  };

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'Разрешения на сохранение файлов',
      message: 'Требуются разрешения для сохранения',
      buttonNegative: 'Отклонить',
      buttonPositive: 'Разрешить',
    },
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    const response = await config(options).fetch('GET', link);
    return response.path();
  }

  return '';
};
