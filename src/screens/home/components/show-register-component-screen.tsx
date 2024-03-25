import { Stack } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ButtomsDivider from "~/src/components/buttomsDivider";
import { EmptyList } from "~/src/components/empty-list";
import { TitleOrSubtitle } from "~/src/components/title_subtitle";
import { deleteData } from "~/src/redux/slice";
import { CardUser } from "./card-user";

export const ShowRegister = () => {
    const [type, setType] = useState('fisica');
    const selector = useSelector((state) => state.data)
    const dispatch = useDispatch()
    console.log(selector)
    const onChange = (value: string) => {
        setType(value)
    }

    const deleteItem = (id: number) => {
        dispatch(deleteData(id))
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerTitle: "Lista de cadastro", headerTitleAlign: "center", headerShown: true }} />
            <TitleOrSubtitle subtitle="Selecione o tipo para filtragem" />

            <ButtomsDivider onChangeForm={onChange} />
            <FlatList
                data={selector}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <CardUser item={item} deleteItem={deleteItem}
                    />)}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => <EmptyList />}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,

    },

})