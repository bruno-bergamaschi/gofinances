import React from "react";
import {
    Container,
    Title,
    Amount,
    Fotter,
    Category,
    Icon,
    CategoryName,
    Date,
} from "./style";

interface Category {
    name: string;
    icon: string;
}

export interface TransactionCardProps {
    type: "positive" | "negative";
    title: string;
    amount: string;
    category: Category;
    date: string;
}

interface Props {
    data: TransactionCardProps;
}

type iconType = {
    [key: string]: string;
};

const icon: iconType = {};

export function TransactionCard({ data }: Props) {
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount type={data.type}>
                {data.type === "negative" && "- "}
                {data.amount}
            </Amount>
            <Fotter>
                <Category>
                    <Icon name={data.category.icon} />
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Fotter>
        </Container>
    );
}
