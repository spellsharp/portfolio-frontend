import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

export default function BasicTimeline({ data }) {
  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="lg:text-4xl md:text-2xl sm:text-2xl text-2xl lg:px-0 md:px-10 sm:px-10 px-10 font-medium">
          Education
        </div>
        <div className="lg:flex md:flex sm:hidden hidden">
          {
            <Timeline position="alternate">
              {data.map((item) => (
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className="border border-white border-opacity-10 rounded-md p-5 shadow-[0_0_15px_1px_rgba(59,130,246,0.60)]">
                      <div className="lg:text-3xl md:text-xl sm:text-lg text-lg font-semibold">
                        {item.title}
                      </div>
                      <div>{item.date}</div>
                      <br />
                      <div>{item.description}</div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          }
        </div>
      </div>
      <div className="lg:hidden md:hidden sm:flex">
        <div className="max-w-5xl mx-auto px-10">
          <br />
          <br />
          <div>
            <ul>
              {data.map((item, index) => (
                <li key={index}>
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <p className="text-sm pb-2">{item.date}</p>
                  <p className="text-sm">{item.description}</p>
                  <br />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
