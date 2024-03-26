import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Doc } from '../dtos';
import { ModalCustom } from './modal-custom';

interface ImagePicker {
    file?: Doc,
    title: string;

}

export const ShowImagePicker = ({ file, title }: ImagePicker) => {
    const [visibleModal, setVisibleModal] = useState(false);

    const showImageModal = () => {
        setVisibleModal(true)
    }





    async function downloadFile(file) {
        try {
            if (!file) {
                console.error('Arquivo não definido.');
                return;
            }

            const fileUri = FileSystem.documentDirectory + file.fileName;


            // Copiar o arquivo para o diretório de documentos
            const result = await FileSystem.copyAsync({ from: file.uri, to: fileUri });
            console.log("result", result);
            Alert.alert('Download Concluído', `O arquivo ${file.fileName} foi baixado com sucesso.`);
        } catch (error) {
            console.error('Erro ao baixar o arquivo:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar baixar o arquivo.');
        }
    }

    downloadFile({
        "fileName": "172ad56a-f81b-4a3f-bbca-7cc7a2bd4e95.jpeg",
        "id": 1923,
        "uri": "file:///data/user/0/com.daniellaa.PeopleRegister/cache/ImagePicker/172ad56a-f81b-4a3f-bbca-7cc7a2bd4e95.jpeg"
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.Button} onPress={showImageModal} disabled={file?.fileName ? false : true}>
                <Text style={styles.titlePhoto}>{file?.fileName ?? "Imagem documento"}</Text>
            </TouchableOpacity>
            <Text style={styles.subtitlePhoto}>{title}</Text>
            <View style={styles.containerButton}>
            </View>
            <ModalCustom visible={visibleModal} onChange={() => setVisibleModal(!visibleModal)} document={file?.uri ?? ""} onCloseModal={() => setVisibleModal(!visibleModal)} downloadFileButton={downloadFile} />

        </View>
    );
};


const styles = StyleSheet.create({

    container: {
        marginVertical: 15,
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: "solid",
        borderColor: "grey",
        padding: 15
    },

    titlePhoto: {
        fontFamily: "Raleway",
        fontSize: 14,
        color: "grey",
        fontWeight: "bold",
        marginBottom: 5

    },
    subtitlePhoto: {
        fontFamily: "Raleway",
        fontSize: 13,
        color: "grey",
        marginBottom: 10

    },
    subtitleButton: {
        fontFamily: "Raleway",
        fontSize: 15,
        color: "grey",
        marginLeft: 5

    },
    img: { width: 28, height: 28, },
    Button: {
        flexDirection: "row",
        alignItems: "center",
    },
    containerButton: {
        flexDirection: "row", justifyContent: "space-between"
    }
})
