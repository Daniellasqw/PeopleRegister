import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CustomNavigation } from "~/src/components/custom-navigation";
import { Register } from "./components/register-component-screen";
import { ShowRegister } from "./components/show-register-component-screen";

export const Home = () => {
  const [screen, setScreen] = useState<string>('add');
  const onChange = (screen: string) => {
    setScreen(screen)
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {screen == "add" ? <Register replaceScreenUp={() => setScreen('show')} /> : <ShowRegister />}
      <View style={{ justifyContent: 'flex-end' }}>
        <CustomNavigation onChangeScreen={onChange} screen={screen} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({


});