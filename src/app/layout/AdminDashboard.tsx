import * as React from "react";
import { observer } from "mobx-react-lite";
import Dashboard from "./Dashboard.tsx";

const AdminDashboard = () => {
  return <Dashboard></Dashboard>;
};

export default observer(AdminDashboard);
