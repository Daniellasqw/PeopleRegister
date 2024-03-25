import AsyncStorage from '@react-native-async-storage/async-storage';


export const setStorage = async (title:string,value: boolean|{}|string|[]) => {
    await AsyncStorage.setItem(title, JSON.stringify(value));
}

export const getStorage = async (title:string): Promise<boolean | null|{}|[]> => {
    const storedValue = await AsyncStorage.getItem(title);
    return storedValue ? JSON.parse(storedValue) : null;
}