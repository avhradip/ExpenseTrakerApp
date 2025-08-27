import { firestore } from "@/config/firebase";
import { ResponseType, WalletType } from "@/types";
import { collection, doc, setDoc } from "firebase/firestore";

export const createOrUpdateWallet = async (
    walletData: Partial<WalletType>
): Promise<ResponseType> => {
    try {
        let walletToSave = { ...walletData }

        if (!walletData?.id) {
            //new wallet

            walletToSave.amount = 0
            walletToSave.totalIncome = 0
            walletToSave.totalExpenses = 0
            walletToSave.created = new Date()
        }

        const WalletRef = walletData?.id ? doc(firestore, "wallets", walletData?.id) : doc(collection(firestore, "wallets"))

        await setDoc(WalletRef, walletToSave, { merge: true })
        return { success: true, data: { ...walletToSave, id: WalletRef.id } }

    } catch (error: any) {
        console.log('error to create or update wallet:', error);
        return {
            success: false,
            msg: error.message
        }
    }
}