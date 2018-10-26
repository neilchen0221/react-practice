import React from "react";
import moment from "moment-timezone";
import Clock from "./Clock";
import "./../clock.css";

function cityToTimeZone(city) {
  if (city.toLowerCase() === "new york") {
    return "America/New_York";
  } else if (city.toLowerCase() === "sydney") {
    return "Australia/Sydney";
  } else if (city.toLowerCase() === "seoul") {
    return "Asia/Seoul";
  } else if (city.toLowerCase() === "london") {
    return "Europe/London";
  }

  throw new Error(`Didn't recgonize the city: ${city}`);
}

export default class WorldClock extends Clock {
  render() {
    const { time } = this.state;
    const timezone = cityToTimeZone(this.props.city || "sydney");

    const dateTime = moment(time).tz(timezone);
    const date = dateTime.format("ddd MMM DD YYYY");
    const hours = dateTime.format("HH");
    const minutes = dateTime.format("mm");
    const seconds = dateTime.format("ss");

    return (
      <div className="clock">
        <div className="clock__date">{date}</div>
        <div className="clock__time">
          <div className="clock__time-square">{hours}</div>
          <span className="clock__time-colon">:</span>
          <div className="clock__time-square">{minutes}</div>
          <span className="clock__time-colon">:</span>
          <div className="clock__time-square">{seconds}</div>
        </div>
      </div>
    );
  }
}
