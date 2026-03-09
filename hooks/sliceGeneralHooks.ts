import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export const useAuthSelector = () => useAppSelector((state: RootState) => state.auth)
export const useUserSelector = () => useAppSelector((state: RootState) => state.user)