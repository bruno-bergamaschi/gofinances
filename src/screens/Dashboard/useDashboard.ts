import { useCallback, useEffect, useState } from "react";
import { TransactionCardProps } from "../../components/TransactionCard";

import AsyncStorage from "@react-native-async-storage/async-storage";

import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighLightProps {
    total: string;
}

interface HighLightData {
    entries: HighLightProps;
    expensives: HighLightProps;
}

export const useDashboard = () => {
    const [transactions, setTransactions] = useState<DataListProps[]>();
    const [highLightData, setHighLightData] = useState<HighLightData>(
        {} as HighLightData
    );

    async function loadTransaction() {
        let entriesTotal = 0;
        let expensiveTotal = 0;

        const dataKey = "@gofinance:transactions";
        const response = await AsyncStorage.getItem(dataKey);

        const transactions = response ? JSON.parse(response) : [];

        const transactionsFormatted: DataListProps[] = transactions.map(
            (item: DataListProps) => {
                if (item.type === "positive") {
                    entriesTotal += Number(item.amount);
                } else expensiveTotal += Number(item.amount);

                const amount = Number(item.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                });
                const date = Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date,
                };
            }
        );

        setTransactions(transactionsFormatted);
        setHighLightData({
            entries: {
                total: entriesTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
            },
            expensives: {
                total: expensiveTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
            },
        });
    }

    useEffect(() => {
        loadTransaction();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTransaction();
        }, [])
    );

    return { transactions, highLightData };
};
