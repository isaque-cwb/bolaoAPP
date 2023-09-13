import { Heading, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export function Find() {
    return (
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss} >

            <VStack flex={1} bgColor={'gray.900'}>
                <Header title="Buscar por Código" showBackButton />
                <VStack mt={8} mx={5} alignItems={'center'} >
                    <Heading fontFamily={'heading'} color={'white'} fontSize={'xl'} mb={8} textAlign={'center'} >
                        Encontre um bolão através de {'\n'} seu código único
                    </Heading>
                    <Input mb={2} placeholder="Qual o código do bolão?" />
                    <Button title="CRIAR MEU BOLÃO" />

                </VStack>
            </VStack >
        </TouchableWithoutFeedback>

    )
}