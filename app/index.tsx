
import {Home} from '~/src/screens/home/home';
import { Welcome } from '~/src/screens/wellcome/wellcome';
import { useDispatch, useSelector  } from 'react-redux';
import { useEffect } from 'react';
import {replaceStateInitial} from '../src/redux/slice'
import { getStorage } from '~/utils/asyncStorage';


export default function InitialPage() {

  const dispatch = useDispatch()
  const storage = async ()=>{
    const screenInitialState = await getStorage("screemInitialWelcome");
    if(screenInitialState){
      dispatch(replaceStateInitial())
    }
  }

  useEffect(() => {
    storage()
  },[])
 
  const initialRouter = useSelector((state: any) => state?.screenInitialState)

  return (
    
      initialRouter ? <Home/> : <Welcome/>
    
   
  );
}


