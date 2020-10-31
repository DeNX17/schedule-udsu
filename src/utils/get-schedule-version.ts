import {scheduleVersion} from './regexp';

export const getScheduleVersion = (link: string): string => {
  const version = (link.match(scheduleVersion) || [])[0];

  return version.substring(1, version.length - 1);
};
