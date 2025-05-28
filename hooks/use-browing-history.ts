import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BrowsingHistory = {
    products: { id: string; category: string;  }[];
}

const initialState: BrowsingHistory = {
    products: [],   
};

export const browsingHistoryStore = create<BrowsingHistory>()(
    persist(() => initialState, {
        name: 'browsingHistoryStore',
    })
);

const useBrowsingHistory = () => {
    const { products } = browsingHistoryStore();
    return {
        products,
        addItem: (product: { id: string; category: string; }) =>
        {
            const index= products.findIndex(item => item.id === product.id);
            if (index === -1) products.splice(index, 1) // remove duplicate if it exists
            products.unshift(product); // add to the beginning of the array
            if(products.length > 10) {
                products.pop(); // remove the last item if the length exceeds 10
            }
            browsingHistoryStore.setState({ products });
        }
        ,
        clear: () => {
            browsingHistoryStore.setState({ products: [] });
        }
    };
};

export default useBrowsingHistory;
