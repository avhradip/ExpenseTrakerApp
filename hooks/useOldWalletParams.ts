import { useLocalSearchParams } from "expo-router";

export type OldWalletType = {
    id?: string;
    name: string;
};

export function useOldWalletParams(): OldWalletType {
    return useLocalSearchParams() as unknown as OldWalletType;
}
