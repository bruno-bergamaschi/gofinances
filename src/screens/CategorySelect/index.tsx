import React from "react";

import { categories } from "../../../utils/categories";
import { Button } from "../../components/Form/Button";

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    CategoryList,
    Fotter,
} from "./style";

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory,
}: Props) {
    function handleCategorySelect(category: Category) {
        setCategory(category);
    }

    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <CategoryList
                data={categories}
                style={{ flex: 1, width: "100%" }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category
                        onPress={() => {
                            handleCategorySelect(item);
                        }}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Fotter>
                <Button title={"Selecionar"} onPress={closeSelectCategory} />
            </Fotter>
        </Container>
    );
}
