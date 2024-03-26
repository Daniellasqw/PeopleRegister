import { EvilIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Divider, Text } from "react-native-paper";
import { ModalCustom } from "~/src/components/modal-custom";
import { TitleOrSubtitle } from "~/src/components/title_subtitle";

export const CardUser = ({ item, deleteItem }: { item: any, deleteItem: (id: any) => void }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const delItem = () => {
    deleteItem(item.id)
    setModalVisible(!modalVisible)
  }
  return (
    <View style={styles.cardUser}>
      <Swipeable
        overshootRight={false}
        overshootLeft={false}
        renderRightActions={() => {
          return (
            <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
              <View style={styles.swipeContainer}>
                <View style={styles.swipeBody}>
                  <EvilIcons name="trash" size={24} color="white" />
                  <Text style={styles.swipeLabel}>
                    Excluir
                  </Text>

                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
        renderLeftActions={() => {
          return (
            <TouchableWithoutFeedback onPress={() => router.navigate({
              pathname: "edit",
              params: {
                id: item.id
              }
            })}>
              <View style={styles.swipeContainer}>
                <View style={[styles.swipeBody, { backgroundColor: "#355cdc" }]}>
                  <EvilIcons name="pencil" size={24} color="white" />
                  <Text style={styles.swipeLabel}>
                    Editar
                  </Text>

                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      >
        <TouchableOpacity style={styles.userInfo} onPress={() => router.navigate({
          pathname: "details",
          params: {
            id: item.id
          }
        })}>
          {item.name && <TitleOrSubtitle title="Nome" subtitle={item.name} sizetitle={12} sizeSubtitle={14} />}
          {item.reasonSocial && <TitleOrSubtitle title="Razão Social" subtitle={item.reasonSocial} sizetitle={12} sizeSubtitle={14} />}
          <Divider />
          {item.cpf && <TitleOrSubtitle title="CPF" subtitle={item.cpf} sizetitle={12} sizeSubtitle={14} />}
          {item.cnpj && <TitleOrSubtitle title="CNPJ" subtitle={item.cnpj} sizetitle={12} sizeSubtitle={14} />}
          <Divider />
          {item.phoneNumber && <TitleOrSubtitle title="Telefone" subtitle={item.phoneNumber} sizetitle={12} sizeSubtitle={14} />}
          <Divider />
          {item.email && <TitleOrSubtitle title="Email" subtitle={item.email} sizetitle={12} sizeSubtitle={14} />}

        </TouchableOpacity>
      </Swipeable>
      <ModalCustom onChange={delItem} visible={modalVisible} title="Atenção!" subtitle="Tem certeza que deseja excluir esse cadastro?" titleButton="Excluir" onCloseModal={() => setModalVisible(!modalVisible)} />
    </View>
  )
}

const styles = StyleSheet.create({

  cardUser: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: "#fff"
  },
  userInfo: {
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 10,
  },
  swipeContainer: {
    maxWidth: 100,
  },
  swipeBody: {
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 80,
  },
  swipeLabel: {
    color: '#fff',
  },
})