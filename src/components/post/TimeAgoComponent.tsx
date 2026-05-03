"use client";

import ReactTimeAgo from "react-time-ago";
import "react-time-ago/locale/en"

type TimeAgoProps = {
  date: Date;
};

const TimeAgoComponent = ({ date }: TimeAgoProps) => {
  return <ReactTimeAgo date={date} locale="en" className={``} />;
};

export default TimeAgoComponent;
