import React from "react";
import {
    Container,
    Header,
    Title,
    Icon,
    Fotter,
    Amount,
    LastTransaction,
} from "./style";

interface Props {
    title: string;
    amount: string;
    lastTransaction: string;
    type: "up" | "down" | "total";
}

type iconType = {
    [key: string]: string;
};

const icon: iconType = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign",
};

export function HighlightCard({ title, amount, lastTransaction, type }: Props) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type} />
            </Header>
            <Fotter>
                <Amount type={type}>{amount}</Amount>
                <LastTransaction type={type}>{lastTransaction}</LastTransaction>
            </Fotter>
        </Container>
    );
}
