import { STRAVA_API_URL } from "src/constants";

interface IGetActivitiesUrl {
  page: number
  activitiesPerPage?: number
  beforeTimestamp?: number
  afterTimestamp?: number
}

export const getActivitiesUrl = ({ page, activitiesPerPage = 20, beforeTimestamp, afterTimestamp }: IGetActivitiesUrl) =>
    `${STRAVA_API_URL}/athlete/activities?page=${page}&per_page=${activitiesPerPage}${beforeTimestamp ? '&before=' + beforeTimestamp : ''} ${afterTimestamp ? '&after=' + afterTimestamp : ''}`