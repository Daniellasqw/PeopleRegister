import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addCPFMask, addPhoneMask } from "~/utils/masks";
import { FormData } from "../dtos";
import { editData, setData } from "../redux/slice";
import { ButtomBackCustom } from "./buttom-back-custom";
import { ButtomNextCustom } from "./buttom-next-custom";
import { ImagePickerScreen } from "./image-picker";
import { ModalCustom } from "./modal-custom";
interface formPerson {
    replaceScreen?: () => void,
    item?: FormData
}

export const FormPhysicalPerson = ({ replaceScreen, item }: formPerson) => {
    const [stack, setStack] = useState(1);
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    console.log("item FORM", item)

    const [form1Data, setForm1Data] = useState<FormData>({
        name: item?.name ?? "",
        cpf: item?.cpf ?? "",
        address: item?.address ?? "",
        email: item?.email ?? "",
        phoneNumber: item?.phoneNumber ?? "",
        type: "fisica"
        //documentos:[]
    });

    const [errors, setErrors] = useState<FormData>({
        nome: "",
        cpf: "",
        address: "",
        email: "",
        phoneNumber: "",
    });

    const messageRequired = "* Campo obrigatório";

    const handleNextClick = (value: number) => {
        const newErrors = { ...errors };
        let hasError = false;

        if (!form1Data.name?.trim()) {
            newErrors.name = messageRequired;
            hasError = true;
        } else {
            newErrors.name = "";
        }

        if (!form1Data.cpf?.trim() || form1Data.cpf.length < 14) {
            newErrors.cpf = messageRequired;
            hasError = true;
        } else {
            newErrors.cpf = "";
        }

        if (!form1Data.address?.trim()) {
            newErrors.address = messageRequired;
            hasError = true;
        } else {
            newErrors.address = "";
        }

        if (!form1Data.email?.trim()) {
            newErrors.email = messageRequired;
            hasError = true;
        } else if (!isValidEmail(form1Data.email.trim())) {
            newErrors.email = "E-mail inválido";
            hasError = true;
        } else {
            newErrors.email = "";
        }

        if (!form1Data.phoneNumber?.trim() || form1Data.phoneNumber.length < 15) {
            newErrors.phoneNumber = messageRequired;
            hasError = true;
        } else {
            newErrors.phoneNumber = "";
        }

        setErrors(newErrors);

        if (!hasError) {
            setStack(value);
        }
    };

    const submitForm = () => {
        if (item?.id) {
            const data = { ...form1Data, id: item?.id }
            dispatch(editData(data))
            console.log(item?.id)
            setModalVisible(true)
        }
        else {
            const id = Math.floor(Math.random() * 1999);
            const data = { ...form1Data, id: id }
            dispatch(setData(data))
            console.log(data)
            setModalVisible(true)
        }

    }
    const handleInputChange = (fieldName: keyof FormData, value: string) => {
        const newForm1Data = { ...form1Data, [fieldName]: value };
        setForm1Data(newForm1Data);

        const newErrors = { ...errors };
        if (newErrors[fieldName]) {
            newErrors[fieldName] = "";
            setErrors(newErrors);
        }
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const stackForm1 = () => {
        return (
            <View>
                {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("name", text)}
                    label="Nome"
                    mode="outlined"
                    value={form1Data.name}
                />

                {errors.cpf ? <Text style={styles.error}>{errors.cpf}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("cpf", addCPFMask(text))}
                    label="CPF"
                    mode="outlined"
                    keyboardType="numeric"
                    maxLength={14}
                    value={form1Data.cpf}
                />

                {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("email", text)}
                    label="E-mail"
                    mode="outlined"
                    value={form1Data.email}
                />

                {errors.address ? <Text style={styles.error}>{errors.address}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("address", text)}
                    label="Endereço"
                    mode="outlined"
                    value={form1Data.address}
                />

                {errors.phoneNumber ? (
                    <Text style={styles.error}>{errors.phoneNumber}</Text>
                ) : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("phoneNumber", addPhoneMask(text))}
                    label="Telefone"
                    mode="outlined"
                    keyboardType="numeric"
                    maxLength={15}
                    value={form1Data.phoneNumber}
                />
                <ButtomNextCustom value={stack} setNext={handleNextClick} />
            </View>
        );
    };
    const stackForm2 = () => {
        return (
            <View>
                <Text>
                    Pronto! Chegamos no final, agora é só anexar os documentos
                    necessários.
                </Text>

                <ImagePickerScreen title="Anexar RG" />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >


                    <ButtomBackCustom value={stack} setNext={handleNextClick} />
                    <Button
                        icon="check"
                        textColor="#fff"
                        style={{ borderRadius: 8 }}
                        buttonColor={"#8fc57b"}
                        onPress={submitForm}
                    >
                        Salvar
                    </Button>
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <ScrollView style={{ height: "100%" }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {stack === 1 && stackForm1()}
                {stack === 2 && stackForm2()}
                <ModalCustom onChange={replaceScreen} visible={modalVisible} title="Sucesso" subtitle="Cadastro realizado com sucesso." titleButton="Entendi" />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 30,
        marginHorizontal: 15,
        paddingTop: 20,
    },
    input: {
        height: 40,
        marginBottom: 30,
        paddingHorizontal: 10,
        backgroundColor: "#fff",

    },
    error: {
        color: "red",

    },
});
