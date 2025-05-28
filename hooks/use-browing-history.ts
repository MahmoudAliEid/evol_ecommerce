import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BrowsingHistory = {
    products: { id: string; category: string;  }[];
}

const initialState: BrowsingHistory = {
    products: [],   
};

export const browsingHistoryStore = create<BrowsingHistory>()(
  persist(
    (set) => ({
      ...initialState,
      setProducts: (products: { id: string; category: string }[]) =>
        set({ products }),
    }),
    {
      name: "browsingHistoryStore",
    }
  )
);

const useBrowsingHistory = () => {
  const { products } = browsingHistoryStore();
  return {
    products,
    addItem: (product: { id: string; category: string }) => {
      // Remove duplicate if it exists
      const filtered = products.filter((item) => item.id !== product.id);
      // Add to the beginning
      const updated = [product, ...filtered];
      // Limit to 10 items
      if (updated.length > 10) updated.pop();
      browsingHistoryStore.setState({ products: updated });
    },
    clear: () => {
      browsingHistoryStore.setState({ products: [] });
    },
  };
};

export default useBrowsingHistory;
