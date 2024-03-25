import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from 'react-native-paper'

import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { OnchangeType } from "~/src/dtos";


export const CustomNavigation = ({onChangeScreen,screen}:OnchangeType) => {


    const setInfo=(name:string)=>{
        if(onChangeScreen){
            onChangeScreen(name)
        }
    }
    return (
        <View style={styles.navbar}>
            <TouchableOpacity
                style={[
                    styles.navItem,
                    screen === 'show' && styles.activeNavItem
                ]}
                onPress={() => setInfo('show')}
            >
                <Ionicons name="create-outline" size={24} color={screen === 'show'?"#fff":"#000"} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.navItem,
                    screen === 'add' && styles.activeNavItem
                ]}
                onPress={() => setInfo('add')}
            >
                <Ionicons name="add" size={24} color={screen === 'add'?"#fff":"#000"} />
            </TouchableOpacity>
           
            </View>
           

      
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor:"#e7e8ed",
        borderTopEndRadius:20,
        borderTopStartRadius:20
    },
    navItem: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'transparent',
    },
    activeNavItem: {
        position: 'relative',
        bottom: 10,
        borderRadius: 40,
        backgroundColor: '#7d7f9e',
        borderLeftWidth:5,
        borderColor:"#5c5e75",
        
    },
});