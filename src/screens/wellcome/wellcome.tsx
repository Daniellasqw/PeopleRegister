
import { useState } from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { replaceStateInitial } from "~/src/redux/slice";
import { setStorage } from "~/utils/asyncStorage";


const { width } = Dimensions.get("screen")
export const Welcome = () => {
  const dispatch = useDispatch()
  const onchangeStateScreen =async()=>{
    setStorage("screemInitialWelcome",true)
    dispatch(replaceStateInitial());
  }
  return (
    <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text  style={{fontFamily:"Raleway",color:"grey"}}>Seja bem-vindo ao</Text>
        <Text style={{fontFamily:"Raleway",fontSize:26}}>PEOPLE REGISTER</Text>
            <LottieView
            source={require("../../../assets/welcome.json")}
            autoPlay={true}
            loop={true}
            style={{height:width,width:width}}
            />
            <Text style={{fontFamily:"Raleway",color:"grey",textAlign:"center",marginHorizontal:15}}>Estamos aqui para simplificar e organizar o processo de registro, garantindo uma experiência intuitiva e eficiente para todos os usuários.</Text>
            <Button  textColor="#fff" style={{borderRadius:5,marginTop:10}} buttonColor={"#7d7f9e"} onPress={onchangeStateScreen
            } >Começar</Button>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        marginTop:width/2,
        margin:width*0.1,
        backgroundColor:"#f8fafc"
    },
    image: {
        width: width / 2,
        height: width / 2,
    },
    coontainerItem:{
        alignItems: 'center',
    }
   
});