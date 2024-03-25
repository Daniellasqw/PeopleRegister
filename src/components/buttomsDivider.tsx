import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { OnchangeType } from '~/src/dtos';

const ButtomsDivider = ({onChangeForm}:OnchangeType) => {
  const [value, setValue] = React.useState('fisica');
  const setInfo=(value:string)=>{
    setValue(value)
    if(onChangeForm){
        onChangeForm(value)
    }
  }
 
  return (
    <View style={styles.buttomContainer}>
      <TouchableOpacity style={value == "fisica" ? [styles.buttomLeft, styles.buttomOn] : styles.buttomLeft} onPress={() => setInfo("fisica")}>
        <Text style={value == "fisica" ? styles.textOn : styles.textOff} >Física</Text>
      </TouchableOpacity>
      <TouchableOpacity style={value == "juridica" ? [styles.buttomRight, styles.buttomOn] : styles.buttomRight} onPress={() => setInfo("juridica")}>
        <Text style={value == "juridica" ? styles.textOn : styles.textOff}>Jurídica</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtomsDivider;

const styles = StyleSheet.create({

  buttomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginTop: 20,
   
  },
  buttomLeft: {
    flex: 1,
    borderBottomLeftRadius:5,
    borderTopLeftRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: "#e7e8ed",

  },
  buttomRight: {
    flex: 1,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: "#e7e8ed",
   

  },
  textOn: {
    color:"#fff",
    fontWeight: "bold"
   },
   textOff: {
     color:"#000",
     fontFamily:"Raleway",
   },
  buttomOn: {
    flex: 1,
    backgroundColor: "#7d7f9e",
    fontFamily:"Raleway",
    
  }

})