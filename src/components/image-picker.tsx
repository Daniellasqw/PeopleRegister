import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ModalCustom } from './modal-custom';

export const ImagePickerScreen = ({ title }: { title?: String }) => {
    const [file, setFile] = useState<{ uri: string; fileName: string, id: number } | null>(null);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalDelete, setVisibleModalDelete] = useState(false);

    const handleError = (message: string) => { };
    const pickImage = useCallback(async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('');
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            const uri = result.assets[0].uri;
            const parts = uri.split('/');
            const fileName = parts[parts.length - 1];
            const id = Math.floor(Math.random() * 1999)
            setFile({
                uri: uri,
                fileName: fileName,
                id: id
            })



        } catch (error: any) {
            handleError('' + error.message);
        }
    }, []);

    const captureFromCamera = useCallback(async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('');
            }

            const result = await ImagePicker.launchCameraAsync({
                base64: true,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            const uri = result.assets[0].uri;
            const parts = uri.split('/');
            const fileName = parts[parts.length - 1];
            const id = Math.floor(Math.random() * 1999)
            setFile({
                uri: uri,
                fileName: fileName,
                id: id
            })



        } catch (error: any) {
            handleError('' + error.message);
        }
    }, []);
    const showImageModal = () => {
        setVisibleModal(true)
    }

    const deletFile = () => {
        setVisibleModalDelete(!visibleModalDelete)
        setFile(null);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.Button} onPress={showImageModal} disabled={file?.fileName ? false : true}>
                <Text style={styles.titlePhoto}>{file?.fileName ?? title ?? "Imagem documento"}</Text>
            </TouchableOpacity>
            <Text style={styles.subtitlePhoto}>{file?.fileName ? "Documento Anexado" : "Envie arquivos JPG"}</Text>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.Button} onPress={pickImage}>
                    <Image source={file?.fileName ? require("../../assets/refresh.svg") : require("../../assets/menu-dots.svg")} style={styles.img} />
                    <Text style={styles.subtitleButton}>{file?.fileName ? "Mudar arquivo" : "Escolher na Galeria"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button} onPress={file?.fileName ? () => setVisibleModalDelete(!visibleModalDelete) : captureFromCamera}>
                    <Image source={file?.fileName ? require("../../assets/trash-can.svg") : require("../../assets/camera.svg")} style={styles.img} />
                    <Text style={styles.subtitleButton}>{file?.fileName ? "Excluir" : "Tirar foto"}</Text>
                </TouchableOpacity>
            </View>
            <ModalCustom visible={visibleModal} onChange={() => setVisibleModal(!visibleModal)} document={file?.uri ?? ""} />
            <ModalCustom visible={visibleModalDelete} onChange={deletFile} title='Atenção' subtitle='Realmente deseja excluir o arquivo?' titleButton='Excluir' />
        </View>
    );
};


const styles = StyleSheet.create({

    container: {
        marginVertical: 15,
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: "dashed",
        borderColor: "grey", padding: 15
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
