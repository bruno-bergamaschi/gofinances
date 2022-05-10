import React from "react";
import { Keyboard, Modal, TouchableWithoutFeedback } from "react-native";

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
} from "./style";

import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import { Button } from "../../components/Form/Button";

import { useRegister } from "./useRegister";

export function Register() {
    const {
        transactionType,
        categoryModalOpen,
        category,
        setCategory,
        control,
        errors,
        handleSubmit,
        handleRegister,
        handleTransactionTypeSelect,
        handleOpenSelectCategoryModal,
        handleCloseSelectCategoryModal,
    } = useRegister();

    return (
        //* TouchableWithoutFeedback escuta o click fora do Keyboard e então fecha o Keyboard
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name={"name"}
                            control={control}
                            placeholder="Nome"
                            autoCapitalize={"sentences"}
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name={"amount"}
                            control={control}
                            placeholder="Preço"
                            keyboardType={"numeric"}
                            error={errors.amount && errors.amount.message}
                        />

                        <TransactionsTypes>
                            <TransactionTypeButton
                                onPress={() =>
                                    handleTransactionTypeSelect("up")
                                }
                                type={"up"}
                                title={"Income"}
                                isActive={transactionType === "up"}
                            />
                            <TransactionTypeButton
                                onPress={() =>
                                    handleTransactionTypeSelect("down")
                                }
                                type={"down"}
                                title={"Outcome"}
                                isActive={transactionType === "down"}
                            />
                        </TransactionsTypes>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>
                    <Button
                        title={"Enviar"}
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal
                    visible={categoryModalOpen}
                    statusBarTranslucent={true}
                    animationType={"fade"}
                >
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}
