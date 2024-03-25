import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { TitleOrSubtitle } from "~/src/components/title_subtitle";

export const Details = () => {
  const { id } = useLocalSearchParams();
  const selector = useSelector((state: any) => state?.data)
  const item = selector.find((item: any) => item.id == id)
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Stack.Screen options={{ headerTitle: "Detalhes", headerTitleAlign: "center", headerShown: true }} />
        {item.name && <TitleOrSubtitle title="Nome" subtitle={item.name} sizetitle={12} sizeSubtitle={14} />}
        {item.fantasyName && <TitleOrSubtitle title="Nome Fantasia" subtitle={item.fantasyName} sizetitle={12} sizeSubtitle={14} />}
        <Divider />
        {item.reasonSocial && <TitleOrSubtitle title="Razão Social" subtitle={item.reasonSocial} sizetitle={12} sizeSubtitle={14} />}
        <Divider />
        {item.cpf && <TitleOrSubtitle title="CPF" subtitle={item.cpf} sizetitle={12} sizeSubtitle={14} />}
        {item.cnpj && <TitleOrSubtitle title="CNPJ" subtitle={item.cnpj} sizetitle={12} sizeSubtitle={14} />}
        <Divider />
        {item.phoneNumber && <TitleOrSubtitle title={item.type == "fisica" ? "Telefone" : "Telefone Empresa"} subtitle={item.phoneNumber} sizetitle={12} sizeSubtitle={14} />}
        <Divider />
        {item.email && <TitleOrSubtitle title="Email" subtitle={item.email} sizetitle={12} sizeSubtitle={14} />}
        <Divider />
        {item.stateRegistration && <TitleOrSubtitle title="Inscrição Estadual" subtitle={item.stateRegistration} sizetitle={12} sizeSubtitle={14} />}
        <Divider />
        {item.municipalRegistration && <TitleOrSubtitle title="Inscrição Municipal" subtitle={item.municipalRegistration} sizetitle={12} sizeSubtitle={14} />}
        <Divider />
        {item.address && <TitleOrSubtitle title="Endereço" subtitle={item.address} sizetitle={12} sizeSubtitle={14} />}
        <Divider />
        {item.responsible && <TitleOrSubtitle title="Nome - Representante Legal" subtitle={item.responsible} sizetitle={12} sizeSubtitle={14} />}
        <Divider />
        {item.responsibleCPF && <TitleOrSubtitle title="CPF - Representante Legal" subtitle={item.responsibleCPF} sizetitle={12} sizeSubtitle={14} />}
        <Divider />
        {item.responsiblePhoneNumber && <TitleOrSubtitle title="Telefone - Representante Legal" subtitle={item.responsiblePhoneNumber} sizetitle={12} sizeSubtitle={14} />}

      </ScrollView>
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