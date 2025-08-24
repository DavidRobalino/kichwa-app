// Este código maneja la navegación principal de la aplicación dependiendo del estado de autenticación del usuario.
//  Utiliza un hook personalizado (useProfile) para obtener los datos del perfil del usuario. Si el usuario está 
// autenticado (me existe), se muestra el stack de navegación de la aplicación (AppStack); si no está autenticado,
//  se muestra un stack de navegación pública (PublicStack). Además, utiliza GestureHandlerRootView para manejar
//  gestos en toda la vista.
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppStack from './AppStack';
import useProfile from 'src/hooks/data/useProfile';
import PublicStack from './PublicStack';

const MainStack = () => {
  const [isLogged, setIsLogged] = useState(false);
  const { me } = useProfile();

  useEffect(() => {
    if (!me) return setIsLogged(false);
    setIsLogged(true);
  }, [me]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isLogged ? <AppStack /> : <PublicStack />}
    </GestureHandlerRootView>
  );
};

export default MainStack;
