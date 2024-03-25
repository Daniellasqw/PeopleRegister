import React from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ModalCustom {
    visible: boolean;
    onChange?: () => void;
    titleButton?: string;
    title?: string;
    subtitle?: string;
    document?: string;
}

export const ModalCustom = ({ onChange, visible, titleButton, title, subtitle, document }: ModalCustom) => {

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onChange}
            >
                <View style={styles.modalContainer}>
                    <View style={document ? [styles.modalContent, { height: Dimensions.get("screen").height / 1.5, }] : styles.modalContent}>

                        <Text style={styles.modalTextTitle}>{title ? title : "Sucesso!"}</Text>
                        <Text style={styles.modalTextSubtitle}>{subtitle ? subtitle : "Usuário cadastrado com sucesso!"}</Text>
                        {document && <Image source={{ uri: document }} style={styles.document} />}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={onChange} style={styles.button}>
                                <Text style={styles.modalTextButton}>{titleButton ? titleButton : 'Fechar modal'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        height: Dimensions.get("screen").height / 3,
        backgroundColor: '#fff',
        elevation: 5,
    },
    modalTextTitle: {
        marginBottom: 20,
        fontSize: 25,
        margin: 10,
        fontFamily: "Raleway",
        fontWeight: "bold",
    },
    modalTextSubtitle: {
        marginHorizontal: 10,
        fontFamily: "Raleway",
        fontSize: 18,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },
    button: {
        alignItems: "center",
        backgroundColor: "#7d7f9e",
        padding: 20
    },
    modalTextButton: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "Raleway",
    },
    document: {
        width: '100%',
        aspectRatio: 1,
        maxHeight: Dimensions.get('window').height * 0.6,
    }

});


