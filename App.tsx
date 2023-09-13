import { NativeBaseProvider, Text, Center, StatusBar } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { THEME } from './src/styles/theme'
import { Loading } from './src/components/Loading'
import { SignIn } from './src/screens/SignIn';
import { LogBox } from 'react-native';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { New } from './src/screens/New';
import { Find } from './src/screens/Find';

LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',])


export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })




  return (
    <NativeBaseProvider theme={THEME} >
      <AuthContextProvider>

        <StatusBar
          barStyle="light-content"
          backgroundColor={'transparent'}
          translucent
        />
        {
          !fontsLoaded ? <Loading /> : <Find />
        }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}






