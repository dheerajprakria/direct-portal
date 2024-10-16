import Customers from "@/views/customers";
import MainLayout from "../layouts/mainLayout";
import Dashboard from "../views/dashboard";
import Help from "../views/help";
import Membership from "../views/memberships";
import Messages from "../views/messages";
import ProjectLogs from "../views/projectlogs";
import BusinessHub from "@/views/businessHub";
import Categories from "@/views/categories";
import Tasks from "@/views/tasks";
import Settings from "@/views/settings";

import PaymentSuccess from "@/views/payments/success";
import PaymentCancel from "@/views/payments/cancel";
import InvitePage from "@/views/invite";
import Subscription from "@/views/subscription";
import PermissionLayout from "@/layouts/protectedLayout/permissionLayout";
import NotFoundPage from "@/views/notfound";
import Innerpage from "@/views/projectlogs/Innerpage";
import UsersList from "@/components/users/UsersList";
import Staffs from "@/views/staff";
import Pricing from "@/views/pricing";
const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: (
        <PermissionLayout role={["all"]}>
          <Dashboard />,
        </PermissionLayout>
      ),
    },
    {
      path: "/project-logs",
      element: (
        <PermissionLayout role={["servicing", "customer"]}>
          <ProjectLogs />,
        </PermissionLayout>
      ),
    },
    {
      path: "/project-logs/:id",
      element: (
        <PermissionLayout role={["servicing", "customer"]}>
          <Innerpage />
        </PermissionLayout>
      ),
    },
    {
      path: "/customers",
      element: (
        <PermissionLayout role={["servicing", "admin", "superadmin"]}>
          <Customers />
        </PermissionLayout>
      ),
    },
    {
      path: "/pricing",
      element: (
        <PermissionLayout role={["superadmin"]}>
          <Pricing />
        </PermissionLayout>
      ),
    },
    {
      path: "/staff",
      element: (
        <PermissionLayout role={["servicing", "admin", "superadmin"]}>
          <Staffs />
        </PermissionLayout>
      ),
    },
    {
      path: "/messages",
      element: (
        <PermissionLayout role={["customer", "servicing", "resource"]}>
          <Messages />
        </PermissionLayout>
      ),
    },
    {
      path: "/membership",
      element: (
        <PermissionLayout role={["customer"]}>
          <Membership />
        </PermissionLayout>
      ),
    },
    {
      path: "/help",
      element: (
        <PermissionLayout role={["customer", "resource", "servicing"]}>
          <Help />
        </PermissionLayout>
      ),
    },
    {
      path: "/business-hub",
      element: (
        <PermissionLayout role={["customer"]}>
          <BusinessHub />
        </PermissionLayout>
      ),
    },
    {
      path: "/categories",
      element: (
        <PermissionLayout role={["customer"]}>
          <Categories />,
        </PermissionLayout>
      ),
    },
    {
      path: "/tasks",
      element: (
        <PermissionLayout role={["resource"]}>
          <Tasks />
        </PermissionLayout>
      ),
    },
    {
      path: "/users",
      element: (
        <PermissionLayout role={["admin", "superadmin"]}>
          <UsersList />
        </PermissionLayout>
      ),
    },
    {
      path: "/settings",
      element: (
        <PermissionLayout role={["all"]}>
          <Settings />,
        </PermissionLayout>
      ),
    },
    {
      path: "/subscription",
      element: (
        <PermissionLayout role={["customer"]}>
          <Subscription />
        </PermissionLayout>
      ),
    },
    {
      path: "/invite",
      element: (
        <PermissionLayout role={["customer"]}>
          <InvitePage />
        </PermissionLayout>
      ),
    },
    {
      path: "/payments/success",
      element: (
        <PermissionLayout role={["customer"]}>
          <PaymentSuccess />
        </PermissionLayout>
      ),
    },
    {
      path: "/payments/failed",
      element: (
        <PermissionLayout role={["customer"]}>
          <PaymentCancel />
        </PermissionLayout>
      ),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: "/innerpage",
      element: <Innerpage />,
    },
  ],
};

export default mainRoutes;
