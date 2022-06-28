import React from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const sideBarRoutes = [
  {
    path: "/",
    key: 1,
    icon: <UserOutlined />,
    name: "Company",
  },
  {
    path: "/reports",
    key: 2,
    icon: <VideoCameraOutlined />,
    name: "Reports",
  },
  {
    path: "/logs",
    key: 3,
    icon: <UploadOutlined />,
    name: "Logs",
  },
  {
    path: "/wss-users",
    key: 4,
    icon: <UserOutlined />,
    name: "WSS Users",
  },
  {
    path: "/user-permissions",
    key: 5,
    icon: <UploadOutlined />,
    name: "User Permissions",
  },
];

export default sideBarRoutes;
