import { JwtPayload } from "../types/SecurityTypes";

export function decodeJwt<T = any>(token: string): T | null {
  try {
    if (!token) return null;

    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload) as T;
  } catch (error) {
    console.error("Invalid JWT token", error);
    return null;
  }
}

export const getRolesAndPermission = (token: string) => {
  const payload = decodeJwt<JwtPayload>(token);

  return {
    roles: payload?.roles,
    permissions: payload?.permissions
  }
}