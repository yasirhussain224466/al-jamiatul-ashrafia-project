import { lazy } from "react";

import RouteAuth from "./RouteAuth";
import RouteUnauth from "./RouteUnauth";

const Login = lazy(() => import("@/containers/PageLogin"));
const RecoverPassword = lazy(() => import("@/containers/PageRecoverPassword"));
const setPassword = lazy(() => import("@/containers/SetPassword"));
const Companies = lazy(() => import("@/containers/Dashboard/Company"));
const CompanyDetail = lazy(() =>
  import("@/containers/Dashboard/Company/CompanyDetails/index"),
);
const BuildingAndRooms = lazy(() =>
  import(
    "@/containers/Dashboard/Company/CompanyDetails/Campus/Building & Rooms"
  ),
);
const Reports = lazy(() => import("@/containers/Dashboard/Reports"));
const Logs = lazy(() => import("@/containers/Dashboard/Logs"));
const WSSUsers = lazy(() => import("@/containers/Dashboard/WSS-Users"));
const UsersPermissions = lazy(() =>
  import("@/containers/Dashboard/UserPermissions"),
);

const LaminarReport = lazy(() =>
  import("@/containers/Dashboard/Reports/LaminarReport"),
);
const InvalidScreen = lazy(() => import("@/containers/InvalidScreen"));

export const ROUTES = [
  {
    path: "/login",
    component: Login,
    routeComponent: RouteUnauth,
    exact: true,
  },
  {
    path: "/",
    component: Companies,
    routeComponent: RouteAuth,
    exact: true,
  },
  {
    path: "/companies/:id?",
    component: CompanyDetail,
    routeComponent: RouteAuth,
    exact: true,
  },
  {
    path: "/company/campus/:id",
    component: BuildingAndRooms,
    routeComponent: RouteAuth,
    exact: true,
  },
  {
    path: "/reports",
    component: Reports,
    routeComponent: RouteAuth,
    exact: true,
  },
  {
    path: "/logs",
    component: Logs,
    routeComponent: RouteAuth,
    exact: true,
  },
  {
    path: "/wss-users",
    component: WSSUsers,
    routeComponent: RouteAuth,
    exact: true,
  },
  {
    path: "/user-permissions",
    component: UsersPermissions,
    routeComponent: RouteAuth,
    exact: true,
  },

  {
    path: "/report",
    component: LaminarReport,
    routeComponent: RouteAuth,
    exact: true,
  },

  {
    path: "/forgot-password/:token?",
    component: RecoverPassword,
    routeComponent: RouteUnauth,
    roles: [],
  },
  {
    path: "/set-password/:token?",
    component: setPassword,
    routeComponent: RouteUnauth,
    roles: [],
  },

  {
    path: "/operation-not-supported",
    component: InvalidScreen,
    routeComponent: RouteUnauth,
    roles: [],
  },
];
