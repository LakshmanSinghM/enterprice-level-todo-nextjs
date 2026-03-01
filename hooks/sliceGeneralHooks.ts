import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export const useAuthSelector = () => useAppSelector((state) => state.auth)