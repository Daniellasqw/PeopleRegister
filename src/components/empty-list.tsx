import { View, Image, Dimensions, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
const { width } = Dimensions.get("screen")

export const EmptyList = () => {
    return (
        <View style={styles.container}>
             
             <Text style={{textAlign:'center'}}>
                Ops! No momento você não possue usuários cadastrados!
            </Text>
             
           
            <View style={styles.coontainerItem}>
            <Image source={require("../../assets/empty.png")} style={styles.image} />
            </View>
          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:width/2,
        margin:width*0.1
      
    },
    image: {
        width: width / 2,
        height: width / 2,
    },
    coontainerItem:{
        alignItems: 'center',
    }
   
});