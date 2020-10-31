import RNFetchBlob from 'rn-fetch-blob';
import {setScheduleVersionAsync} from './storage';

export const downloadScheduleAsync = async ({
  link,
  version,
}: ScheduleLinkI): Promise<void> => {
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
  config(options)
    .fetch('GET', link)
    .then((res) => {});
};
