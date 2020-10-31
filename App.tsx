import React, {FC, useEffect} from 'react';
import {View, Text} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const preffix = 'https://f-mkpo.udsu.ru';

export const App: FC = () => {
  useEffect(() => {
    const handleFetchAsync = async () => {
      const html = await (
        await fetch('https://f-mkpo.udsu.ru/class_times')
      ).text();

      const links = html.match(/\/files\/raspisanie-2020.+(xls)/gm) || [];

      const shulderLink = decodeURI(
        links.filter((link) => link.includes('2%20СМЕНА%20ПСО,%20ПД'))[0],
      );

      const downloadLink = `${preffix}${encodeURI(shulderLink)}`;

      const date = new Date();

      const {config, fs} = RNFetchBlob;
      let DownloadDir = fs.dirs.DownloadDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            DownloadDir +
            '/scheduleUdsu' +
            Math.floor(date.getTime() + date.getSeconds() / 2),
          description: 'Downloading image.',
        },
      };
      config(options)
        .fetch('GET', downloadLink)
        .then((res) => {});
    };

    handleFetchAsync();
  }, []);

  return (
    <View>
      <Text>3252</Text>
    </View>
  );
};
