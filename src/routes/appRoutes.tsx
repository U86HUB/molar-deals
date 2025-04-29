
import { RouteObject } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { protectedRoutes } from "./protectedRoutes";
import { vendorRoutes } from "./vendorRoutes";
import { adminRoutes } from "./adminRoutes";

// Combine all routes
export const appRoutes: RouteObject[] = [
  ...publicRoutes,
  ...protectedRoutes,
  ...vendorRoutes,
  ...adminRoutes,
];
