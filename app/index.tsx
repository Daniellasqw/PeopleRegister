import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Home } from '~/src/screens/home/home';
import { Welcome } from '~/src/screens/wellcome/wellcome';
import { getStorage } from '~/utils/asyncStorage';
import { replaceStateInitial, setDataStorage } from '../src/redux/slice';

export default function InitialPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storage = async () => {
      const screenInitialState = await getStorage("screemInitialWelcome");
      const dataUser = await getStorage("dataUser");
      if (dataUser) {
        dispatch(setDataStorage({ data: dataUser }));
      }
      if (screenInitialState) {
        dispatch(replaceStateInitial());
      }
      setLoading(false);
    };

    storage();
  }, []);

  const initialRouter = useSelector((state: any) => state?.screenInitialState);

  if (loading) {
    return <ActivityIndicator color='#7d7f9e' size={40} />;
  }

  return (<SafeAreaView style={{ flex: 1 }}>
    {initialRouter ? <Home /> : <Welcome />}
  </SafeAreaView>);
}
