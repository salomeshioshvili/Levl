import { create } from "zustand";

import { mockTransactions } from "../data/mock";
import type { Transaction } from "../types";

interface TransactionStore {
  transactions: Transaction[];
  selectedCategory: string;
  filteredTransactions: Transaction[];
  setCategory: (category: string) => void;
}

function filterByCategory(
  transactions: Transaction[],
  category: string
): Transaction[] {
  if (category === "all") return transactions;
  return transactions.filter((t) => t.category === category);
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: mockTransactions,
  selectedCategory: "all",
  filteredTransactions: mockTransactions,
  setCategory: (category: string) =>
    set(() => {
      const transactions = get().transactions;
      return {
        selectedCategory: category,
        filteredTransactions: filterByCategory(transactions, category),
      };
    }),
}));
