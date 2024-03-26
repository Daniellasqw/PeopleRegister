
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Home } from '~/src/screens/home/home';
import { Welcome } from '~/src/screens/wellcome/wellcome';
import { getStorage } from '~/utils/asyncStorage';
import { replaceStateInitial, setDataStorage } from '../src/redux/slice';


export default function InitialPage() {

  const dispatch = useDispatch()
  const storage = async () => {
    const screenInitialState = await getStorage("screemInitialWelcome");
    const dataUser = await getStorage("dataUser");
    if (dataUser) {
      dispatch(setDataStorage({ data: dataUser }))
    }
    if (screenInitialState) {
      dispatch(replaceStateInitial())
    }
  }

  useEffect(() => {
    storage()
  }, [])

  const initialRouter = useSelector((state: any) => state?.screenInitialState)

  return (

    initialRouter ? <Home /> : <Welcome />


  );
}


