import { useState } from "react";
import { Alert } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import {
    useNavigation,
    NavigationProp,
    ParamListBase,
} from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

//* Definindo a interface dessa forma, gera erro em handleSubmit(handleRegister):

interface FormData {
    name: string;
    amount: string;
}

//* Opção para tipagem de navigation
type NavigationProps = {
    navigate: (screen: string) => void;
};

//* ERRO:
//! Argument of type '(form: FormData) => void' is not assignable to parameter of type 'SubmitHandler<FieldValues>'.
//! Types of parameters 'form' and 'data' are incompatible.
//! Type '{ [x: string]: any; }' is missing the following properties from type 'FormData': name, amount

//* Alternativa de correção 1 para erro em handleSubmit(handleRegister)

// Definindo um type como [x: tipo] : any, ele irá receber todas as propriedades
// como um modelo, então pode ser passado "name" e "amount" com ele.

// type FormData = {
//     [name: string]: any;
// };

//* Alternativa de correção 2 para erro em handleSubmit(handleRegister)

//Partial<Type>
//Constrói um tipo com todas as propriedades Typedefinidas como opcionais.
//Este utilitário retornará um tipo que representa todos os subconjuntos de um determinado tipo.

//* Schema YUP:

const schema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    amount: Yup.number()
        .required("Campo obrigatório")
        .typeError("Informe um valor numérico")
        .positive("O valor não pode ser negativo"),
});

export const useRegister = () => {
    const [transactionType, setTransactionType] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });

    const { navigate }: NavigationProp<ParamListBase> = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    //* Definir "form: FormData" utilizando a a alternativa de correção 1
    //* Definir "form: Partial<FormData>" utilizando a alternativa de correção 2
    async function handleRegister(form: Partial<FormData>) {
        if (!transactionType)
            return Alert.alert("Selecione o tipo da transação");

        if (category.key === "category")
            return Alert.alert("Selecione a categoria");

        const newTransaction = {
            id: String(uuid.v4()),
            ...form,
            type: transactionType,
            category: category.key,
            date: new Date(),
        };

        const dataKey = "@gofinance:transactions";

        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [...currentData, newTransaction];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
            setTransactionType("");
            setCategory({
                key: "category",
                name: "Categoria",
            });
            reset();
            navigate("Listagem");
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possivel salvar");
        }
    }

    function handleTransactionTypeSelect(type: "positive" | "negative") {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    return {
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
    };
};
