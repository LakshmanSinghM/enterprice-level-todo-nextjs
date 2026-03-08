import { useRouter } from "next/navigation";
import { clearAllTypesOfStorage } from "../storage/storageHelper";

export const getFirstLetterOfName = (
    firstName: string | null = "",
    lastName: string | null = ""
): string => {
    if (!firstName && !lastName) return "";

    const first = firstName?.trim()?.charAt(0)?.toUpperCase() || "";
    const last = lastName?.trim()?.charAt(0)?.toUpperCase() || "";

    return first + last || "U";
};


export const logoutUser = (router: any) => {
    clearAllTypesOfStorage();
    router.push("/")
}