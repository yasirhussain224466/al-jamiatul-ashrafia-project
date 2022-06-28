import React from "react";
// import FileDownloadIcon from "@material-ui/icons/AssignmentTurnedIn";
import { NavLink } from "react-router-dom";

import FileSave from "@/assets/images/save.webp";
import FileDownload from "@/assets/images/download.webp";

export const Report = [
  {
    id: "1",
    Client: "Kaiser Permanente",
    Campus: "Irvine",
    Type: "Laminar",
    Started: "11/02/21",
    Completed: "50%",
    Status: "In Progress",
    Action: true,
  },
  {
    id: "2",
    Client: "Loma Linda University",
    Campus: "Irvine",
    Type: "Laminar",
    Started: "11/02/21",
    Completed: "10/20/21",
    Status: "Completed",
    Action: true,
  },
  {
    id: "3",
    Client: "Adventist Health",
    Campus: "Irvine",
    Type: "Laminar",
    Started: "11/02/21",
    Completed: "10/20/21",
    Status: "Completed",
    Action: true,
  },
  {
    id: "4",
    Client: "Redlands Community Hospital",
    Campus: "Irvine",
    Type: "Laminar",
    Started: "10/20/21",
    Completed: "50%",
    Status: "Completed",
    Action: true,
  },
  {
    id: "5",
    Client: "CHOC Childrens Main Campus Orange",
    Campus: "Irvine",
    Type: "Laminar",
    Started: "10/20/21",
    Completed: "50%",
    Status: "Completed",
    Action: true,
  },
  {
    id: "6",
    Client: "Adventist Health Simi Valley Hospital",
    Campus: "Irvine",
    Type: "Laminar",
    Started: "10/20/21",
    Completed: "50%",
    Status: "Incomplete",
    Action: true,
  },
];

export const ReportColumn = [
  {
    title: "Client",
    dataIndex: "Client",
    key: "Client",
    render: (obj) => <NavLink to="/report">{obj}</NavLink>,
  },
  {
    title: "Campus",
    dataIndex: "Campus",
    key: "Campus",

    render: (text) => <span>{text}</span>,
  },
  {
    title: "Type",
    dataIndex: "Type",
    key: "Type",

    render: (text) => <span>{text}</span>,
  },
  {
    title: "Started",
    dataIndex: "Started",
    key: "Started",

    render: (text) => <span>{text}</span>,
  },
  {
    title: "Completed",
    dataIndex: "Completed",
    key: "Completed",

    render: (text) => <span>{text}</span>,
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Action",
    key: "Action",
    render: (text) => (
      <span
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {text.Status === "In Progress" ? (
          <>
            <img alt="fileSave" src={FileDownload} />
            <img alt="fileSave" src={FileSave} />
          </>
        ) : (
          <img alt="fileSave" src={FileDownload} />
        )}
      </span>
    ),
  },
];

export const LaminarReport = [
  {
    title: "Client",
    dataIndex: "Client",
    key: "Client",
    render: (obj) => <NavLink to="/report">{obj}</NavLink>,
  },
  {
    title: "Campus",
    dataIndex: "Campus",
    key: "Campus",

    render: (text) => <span>{text}</span>,
  },
  {
    title: "Type",
    dataIndex: "Type",
    key: "Type",

    render: (text) => <span>{text}</span>,
  },
  {
    title: "Started",
    dataIndex: "Started",
    key: "Started",

    render: (text) => <span>{text}</span>,
  },
  {
    title: "Completed",
    dataIndex: "Completed",
    key: "Completed",

    render: (text) => <span>{text}</span>,
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Action",
    dataIndex: "Action",
    key: "Action",
    render: () => (
      <span>
        <img alt="fileSave" src={FileDownload} />
        <img alt="fileSave" src={FileSave} />
      </span>
    ),
  },
];
