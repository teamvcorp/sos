export const publicRoutes = ["/","/auth/new-verification"];

export const authRoutes = ["/auth/login", "/auth/register", "/auth/error", "/auth/reset","/auth/new-password"];

export const apiAuthPrefix = "/api/auth";
/** St */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
export const PROFILE_UPDATE_PAGE = (id: string): string => `/dashboard/${id}/profile`;



