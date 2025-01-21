import { Stack } from 'expo-router';
import { SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../src/redux/store';

export default function Layout() {



  return (
    <SafeAreaView>
      <GestureHandlerRootView style={{ flex: 1 }}>

        <ReduxProvider store={store}>
          <StatusBar barStyle={'light-content'} />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: '#7d7f9e' },
              headerShown: false,
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
            <Stack.Screen name="index" />
          </Stack>
        </ReduxProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
