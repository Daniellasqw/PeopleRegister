import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch } from 'react-redux';
import { addCPFMask, addCnpjMask, addPhoneMask } from "~/utils/masks";
import { editData, setData } from "../redux/slice";
import { ButtomBackCustom } from "./buttom-back-custom";
import { ButtomNextCustom } from "./buttom-next-custom";
import { ImagePickerScreen } from "./image-picker";
import { ModalCustom } from "./modal-custom";

interface Form1Data {
    id: number;
    reasonSocial: string;
    fantasyName: string;
    cnpj: string;
    stateRegistration: string;
    address: string;
    email: string;
    phoneNumber: string;
    responsible: string;
    responsibleCPF: string;
    responsiblePhoneNumber: string;
    municipalRegistration: string;
}

interface Errors {
    reasonSocial: string;
    fantasyName: string;
    cnpj: string;
    stateRegistration: string;
    address: string;
    email: string;
    phoneNumber: string;
    responsible: string;
    responsibleCPF: string;
    responsiblePhoneNumber: string;
    municipalRegistration: string;
}
interface formCompany {
    replaceScreen?: () => void,
    item?: Form1Data
}

export const FormCompany = ({ replaceScreen, item }: formCompany) => {
    const [stack, setStack] = useState(1);
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)

    const [form1Data, setForm1Data] = useState<Form1Data>({
        id: item?.id ?? 0,
        reasonSocial: item?.reasonSocial ?? "",
        fantasyName: item?.fantasyName ?? "",
        cnpj: item?.cnpj ?? "",
        stateRegistration: item?.stateRegistration ?? "",
        address: item?.address ?? "",
        email: item?.email ?? "",
        phoneNumber: item?.phoneNumber ?? "",
        responsible: item?.reasonSocial ?? "",
        responsibleCPF: item?.responsibleCPF ?? "",
        responsiblePhoneNumber: item?.responsiblePhoneNumber ?? "",
        municipalRegistration: item?.municipalRegistration ?? ""
    });

    const [errors, setErrors] = useState<Errors>({

        reasonSocial: "",
        fantasyName: "",
        cnpj: "",
        stateRegistration: "",
        address: "",
        email: "",
        phoneNumber: "",
        responsible: "",
        responsibleCPF: "",
        responsiblePhoneNumber: "",
        municipalRegistration: ""

    });
    const handleNextClick1 = (value: number) => {
        const newErrors = { ...errors };
        let hasError = false;

        if (!form1Data.reasonSocial.trim()) {
            newErrors.reasonSocial = "* Campo Razão Social obrigatório";
            hasError = true;
        } else {
            newErrors.reasonSocial = "";
        }

        if (!form1Data.fantasyName.trim()) {
            newErrors.fantasyName = "* Campo Nome Fantasia Obrigatório";
            hasError = true;
        } else {
            newErrors.fantasyName = "";
        }
        if (!form1Data.cnpj.trim() || form1Data.cnpj.length < 14) {
            newErrors.cnpj = "*Campo cnpj obrigatório";
            hasError = true;
        }

        setErrors(newErrors);

        if (!hasError) {
            setStack(value);
        }


    };

    const handleNextClick2 = (value: number) => {
        const newErrors = { ...errors };
        let hasError = false;
        if (!form1Data.address.trim()) {
            newErrors.address = "* Campo Endereço obrigatório";
            hasError = true;
        } else {
            newErrors.address = "";
        }

        if (!form1Data.email.trim()) {
            newErrors.email = "*Campo E-mail obrigatório";
            hasError = true;
        } else if (!isValidEmail(form1Data.email.trim())) {
            newErrors.email = "E-mail inválido";
            hasError = true;
        } else {
            newErrors.email = "";
        }

        if (!form1Data.phoneNumber.trim() || form1Data.phoneNumber.length < 15) {
            newErrors.phoneNumber = "*Campo Telefone obrigatório";
            hasError = true;
        } else {
            newErrors.phoneNumber = "";
        }
        setErrors(newErrors);

        if (!hasError) {
            setStack(value);
        }
    }
    const handleNextClick3 = (value: number) => {
        const newErrors = { ...errors };
        let hasError = false;

        if (!form1Data.responsible.trim()) {
            newErrors.responsible = "* Campo Responsável Social obrigatório";
            hasError = true;
        } else {
            newErrors.responsible = "";
        }


        if (!form1Data.responsibleCPF.trim() || form1Data.responsibleCPF.length < 11) {
            newErrors.cnpj = "*Campo CPF do responsável obrigatório";
            hasError = true;
        } else {
            newErrors.responsibleCPF = "";
        }
        if (!form1Data.responsiblePhoneNumber.trim() || form1Data.responsiblePhoneNumber.length < 15) {
            newErrors.responsiblePhoneNumber = "*Campo Telefone do responsável obrigatório";
            hasError = true;
        } else {
            newErrors.responsiblePhoneNumber = "";
        }

        setErrors(newErrors);

        if (!hasError) {
            setStack(value);
        }

    }
    const handleBackClick = (value: number) => {
        setStack(value);
    }

    const handleInputChange = (fieldName: keyof Form1Data, value: string) => {
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
        const { municipalRegistration, reasonSocial, fantasyName, cnpj, stateRegistration } = form1Data;
        return (
            <View>
                {errors.reasonSocial ? <Text style={styles.error}>{errors.reasonSocial}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("reasonSocial", text)}
                    label="Razão social"
                    mode="outlined"
                    value={reasonSocial}
                />
                {errors.fantasyName ? <Text style={styles.error}>{errors.fantasyName}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("fantasyName", text)}
                    label="Nome fantasia"
                    mode="outlined"
                    value={fantasyName}
                />
                {errors.cnpj ? <Text style={styles.error}>{errors.cnpj}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("cnpj", addCnpjMask(text))}
                    label="CNPJ"
                    mode="outlined"
                    value={cnpj}
                    keyboardType="numeric"
                    maxLength={18}

                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("stateRegistration", text)}
                    label="Inscrição Estadual"
                    mode="outlined"
                    keyboardType="numeric"
                    maxLength={9}
                    value={stateRegistration}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("municipalRegistration", text)}
                    label="Inscrição Municipal"
                    mode="outlined"
                    keyboardType="numeric"
                    maxLength={14}
                    value={municipalRegistration}
                />
                <ButtomNextCustom value={stack} setNext={handleNextClick1} />
            </View>
        );
    };


    const stackForm2 = () => {
        const { address, email, phoneNumber } = form1Data;
        const isEmailValid = isValidEmail(email);
        return (
            <View>
                {errors.address ? <Text style={styles.error}>{errors.address}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("address", text)}
                    label="Endereço"
                    mode="outlined"
                    value={address}
                />
                {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
                {email.length > 0 && !isEmailValid && <Text style={styles.error}>E-mail inválido</Text>}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("email", text)}
                    label="E-mail"
                    mode="outlined"
                    value={email}
                />
                {errors.phoneNumber ? <Text style={styles.error}>{errors.phoneNumber}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("phoneNumber", addPhoneMask(text))}
                    label="Telefone Empresa"
                    mode="outlined"
                    value={phoneNumber}
                    keyboardType="numeric"
                    maxLength={15}
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <ButtomBackCustom value={stack} setNext={handleBackClick} />
                    <ButtomNextCustom value={stack} setNext={handleNextClick2} />
                </View>
            </View>
        );
    };

    const stackForm3 = () => {
        const { responsible, responsibleCPF, responsiblePhoneNumber } = form1Data;

        return (
            <View>
                {errors.responsible ? <Text style={styles.error}>{errors.responsible}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("responsible", text)}
                    label="Representante Legal"
                    mode="outlined"
                    value={responsible}
                />
                {errors.responsibleCPF ? <Text style={styles.error}>{errors.responsibleCPF}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("responsibleCPF", addCPFMask(text))}
                    label="CPF do Representante"
                    mode="outlined"
                    value={responsibleCPF}
                    keyboardType="numeric"
                    maxLength={14}

                />
                {errors.responsiblePhoneNumber ? <Text style={styles.error}>{errors.responsiblePhoneNumber}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange("responsiblePhoneNumber", addPhoneMask(text))}
                    label="Telefone do Representante"
                    mode="outlined"
                    value={responsiblePhoneNumber}
                    keyboardType="numeric"
                    maxLength={15}
                />
                <ImagePickerScreen title="Anexar RG do responsável legal" />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <ButtomBackCustom value={stack} setNext={handleBackClick} />
                    <ButtomNextCustom value={stack} setNext={handleNextClick3} />
                </View>
            </View>
        );
    };

    const stackForm4 = () => {
        return (
            <View>
                <Text style={styles.textEnd}>Pronto! Chegamos no final, agora é só anexar os documentos necessários.</Text>

                <ImagePickerScreen />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                    <ButtomBackCustom value={stack} setNext={handleBackClick} />
                    <Button icon="check" textColor="#fff" style={{ borderRadius: 8 }} buttonColor={"#8fc57b"} onPress={submitForm}>Salvar</Button>

                </View>
            </View>
        );
    };

    const submitForm = () => {
        if (item?.id) {
            const data = { ...form1Data, id: item?.id }
            dispatch(editData(data))
            setModalVisible(true)
        } else {
            const id = Math.floor(Math.random() * 1999);
            const data = { ...form1Data, id: id }
            dispatch(setData(data))
            setModalVisible(true)
        }

    }
    return (
        <View style={styles.container}>
            <ScrollView style={{ height: "80%" }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {stack === 1 && stackForm1()}
                {stack === 2 && stackForm2()}
                {stack === 3 && stackForm3()}
                {stack === 4 && stackForm4()}
            </ScrollView>
            <ModalCustom onChange={replaceScreen} visible={modalVisible} title="Sucesso" subtitle="Cadastro realizado com sucesso." titleButton="Entendi" />
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
    textEnd: {
        marginBottom: 20
    }
});

