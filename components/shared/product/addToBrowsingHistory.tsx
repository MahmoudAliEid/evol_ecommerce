"use client";

import useBrowsingHistory from "@/hooks/use-browing-history";
import { useEffect } from "react";

export default function AddToBrowsingHistory({
    id,
    category }: {
        id: string; 
        category: string;
    }) {
    const { addItem } = useBrowsingHistory();    useEffect(() => {
        console.log('AddToBrowsingHistory: Adding item', { id, category });
        addItem({ id, category });
        console.log('AddToBrowsingHistory: Added item to browsing history');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
