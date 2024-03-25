import { Stack } from "expo-router"
import { useState } from "react"
import { StyleSheet, View } from "react-native"
import ButtomsDivider from "~/src/components/buttomsDivider"
import { FormCompany } from "~/src/components/form-company"
import { FormPhysicalPerson } from "~/src/components/form-physical-person"
import { TitleOrSubtitle } from "~/src/components/title_subtitle"

export const Register = ({replaceScreenUp}:{replaceScreenUp?:()=>void}) => {
  const [type, setType] = useState('fisica');
  const onChange = (value: string) => {
    setType(value)
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Cadastro", headerTitleAlign: "center",headerShown:true }} />
      <TitleOrSubtitle subtitle="Selecione o tipo de cadastro" />
      <ButtomsDivider onChangeForm={onChange} />
      {type === 'fisica' ? <FormPhysicalPerson replaceScreen={replaceScreenUp} /> : <FormCompany replaceScreen={replaceScreenUp}/>}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop:10,
   
  },
 
})