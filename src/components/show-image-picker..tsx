import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { extractPhraseAfterThirdHyphen } from '~/utils/masks';
import { Doc } from '../dtos';
import { ModalCustom } from './modal-custom';

interface ImagePickerProps {
    file?: Doc,
    title: string;
}

export const ShowImagePicker: React.FC<ImagePickerProps> = ({ file, title }) => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [permissionsGranted, setPermissionsGranted] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === 'granted') {
                setPermissionsGranted(true);
            } else {
                Alert.alert('Permissão necessária', 'Por favor, conceda permissão para acessar a biblioteca de mídia.');
            }
        })();
    }, []);

    const showImageModal = () => {
        setVisibleModal(true);
    };

    async function downloadFile() {
        try {
            if (!file) {
                console.error('Arquivo não definido.');
                return;
            }
            const fileUri = FileSystem.cacheDirectory + file.fileName;
            console.log("local", fileUri);


            await FileSystem.copyAsync({ from: file.uri, to: fileUri });


            const asset = await MediaLibrary.createAssetAsync(fileUri);
            await MediaLibrary.createAlbumAsync('Downloaded', asset, false);

            Alert.alert('Download Concluído', `O arquivo ${file.fileName} foi baixado com sucesso.`);
        } catch (error) {

            Alert.alert('Erro', 'Ocorreu um erro ao tentar baixar o arquivo.');
        }
    }



    if (!permissionsGranted) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.Button} onPress={showImageModal} disabled={!file?.fileName}>
                <Text style={styles.titlePhoto}>{extractPhraseAfterThirdHyphen(file?.fileName) ?? "Imagem documento"}</Text>
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
});
