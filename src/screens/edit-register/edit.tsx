import { Stack, router, useLocalSearchParams } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { FormCompany } from "~/src/components/form-company";
import { FormPhysicalPerson } from "~/src/components/form-physical-person";
import { TitleOrSubtitle } from "~/src/components/title_subtitle";

export const Edit = () => {
  const { id } = useLocalSearchParams();
  const selector = useSelector((state: any) => state?.data)
  const item = selector.find((item: any) => item.id == id);
  console.log(item);
  return (
    <View style={styles.container}>
      
     
        
      <Stack.Screen options={{ headerTitle: "Editar Usuário", headerTitleAlign: "center", headerShown: true }} />
      {item.type === 'fisica' ? <FormPhysicalPerson replaceScreen={()=>router.back()} item={item}/> : <FormCompany replaceScreen={()=>router.back()} item={item}/>}
     
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 15
  }

});