import {
  NAME_SCHEDULE_URL_HASH,
  ROOT_UDSU_URL,
  SCHEDULE_LIST_URL,
} from './constants';
import {getScheduleVersion} from './get-schedule-version';
import {myScheduleRegExp} from './regexp';

export const getScheduleLinkAsync = async (): Promise<ScheduleLinkI> => {
  const html = await (await fetch(SCHEDULE_LIST_URL)).text();

  const links = html.match(myScheduleRegExp) || [];

  const shulderLink = decodeURI(
    links.filter((link) => link.includes(NAME_SCHEDULE_URL_HASH))[0],
  );

  return {
    link: `${ROOT_UDSU_URL}${encodeURI(shulderLink)}`,
    version: getScheduleVersion(shulderLink),
  };
};
