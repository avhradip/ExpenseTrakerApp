import { firestore } from "@/config/firebase";
import { ResponseType, WalletType } from "@/types";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";


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

export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
    try {
        const walletRef = doc(firestore, "wallets", walletId);
        await deleteDoc(walletRef);

        return { success: true, msg: "Wallet deleted successfully" };
    } catch (error: any) {
        console.log("Delete Wallet", error.message);
        return { success: false, msg: error.message };
    }
};


// 2. Find all transactions linked to this wallet
// const transactionsRef = collection(firestore, "transactions");
// const q = query(transactionsRef, where("walletId", "==", walletId));
// const snapshot = await getDocs(q);

// 3. Delete each transaction
// const batchDeletes = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
// await Promise.all(batchDeletes);
