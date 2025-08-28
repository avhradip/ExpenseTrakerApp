import { firestore } from "@/config/firebase";
import {
    collection,
    FirestoreError,
    onSnapshot,
    query,
    QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function useFetchData<T = any>(
    collectionName: string,
    constraints: QueryConstraint[] = []
) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!collectionName) return;

        // ❌ Filter out undefined constraints (important!)
        const safeConstraints = constraints.filter(
            (c): c is QueryConstraint => c !== undefined
        );

        const collectionRef = collection(firestore, collectionName);
        const q = query(collectionRef, ...safeConstraints);

        setLoading(true);
        setError(null);

        const unsub = onSnapshot(
            q,
            (snapshot) => {
                const fetchedData = snapshot.docs.map(
                    (doc) =>
                    ({
                        id: doc.id,
                        ...doc.data(),
                    } as T)
                );
                setData(fetchedData);
                setLoading(false);
            },
            (err: FirestoreError) => {
                console.error("Error fetching data:", err);
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsub();
    }, [collectionName, JSON.stringify(constraints)]);

    return { data, loading, error };
}

export default useFetchData;
