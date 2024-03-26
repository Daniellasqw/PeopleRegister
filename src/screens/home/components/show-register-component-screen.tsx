import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ButtomsDivider from "~/src/components/buttomsDivider";
import { EmptyList } from "~/src/components/empty-list";
import { TitleOrSubtitle } from "~/src/components/title_subtitle";
import { deleteData } from "~/src/redux/slice";
import { CardUser } from "./card-user";

export const ShowRegister = () => {
    const [type, setType] = useState('fisica');
    const [searchQuery, setSearchQuery] = useState('');
    const selector = useSelector((state) => state.data);
    const dispatch = useDispatch();

    const filteredData = useMemo(() => {
        return selector.filter(item =>
            (item.type === type) &&
            (
                (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.reasonSocial && item.reasonSocial.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        );
    }, [selector, type, searchQuery]);

    const onChange = (value: string) => {
        setType(value);
    };

    const deleteItem = (id: number) => {
        dispatch(deleteData(id));
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerTitle: "Lista de cadastro", headerTitleAlign: "center", headerShown: true }} />
            <TitleOrSubtitle subtitle="Selecione o tipo para filtragem" />
            <ButtomsDivider onChangeForm={onChange} />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
                placeholder="Buscar por nome ou nome fantasia"
            />
            <FlatList
                data={filteredData}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <CardUser item={item} deleteItem={deleteItem} />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => <EmptyList />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
});
