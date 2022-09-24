import * as Device from 'expo-device';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import MyBackend from '../models/MyBackend';
import { RootTabScreenProps } from '../types';

const myBackend = new MyBackend()

export default function AuthorizationScreen({ navigation }: RootTabScreenProps<'Authorization'>) {

  const [isMobile, setIsMobile] = useState<boolean>(true)
  const [styles, setStyles] = useState(getStyles(isMobile))
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [signInError, setSignInError] = useState("")

  useEffect(() => {
    Device.getDeviceTypeAsync().then((deviceType) => {
      setIsMobile([Device.DeviceType.PHONE, Device.DeviceType.UNKNOWN].includes(deviceType))
    })
  }, [])

  useEffect(() => {
    setStyles(getStyles(isMobile))
  }, [isMobile])

  const signIn = () => {
    myBackend.signIn(login, password)
      .then(() => {
        setSignInError("")
        navigation.navigate("Posts")
      })
      .catch((error) => {
        setSignInError(error instanceof Error ? error.message : String(error))
      })
  }

  return (
    <View style={styles.container}>
      <View style={[styles.authorization, styles['authorization--theme']]}>
        <Text style={[styles.authorization__title, styles['authorization__title--theme']]}>Authorization</Text>
        <br />
        <View style={styles.input_group}>
          <Text style={styles.input_group__label}>login</Text>
          <TextInput style={[styles.input_group__text_input, styles['input_group__text_input--theme']]} onChangeText={setLogin} value={login}/>
        </View>
        <br />
        <View style={styles.input_group}>
          <Text style={styles.input_group__label}>password</Text>
          <TextInput style={[styles.input_group__text_input, styles['input_group__text_input--theme']]} onChangeText={setPassword} value={password}/>
        </View>
        <br />
        <View style={styles.input_group}>
          <Text style={[styles.input_group__error, styles['input_group__error--theme']]}>{signInError}</Text>
        </View>
        <br />
        <View style={styles.input_group}>
          <View style={styles.input_group__submit}>
            <Button title='Submit' color={styles['input_group__submit--theme'].backgroundColor} onPress={signIn}/>
          </View>
        </View>
      </View>
    </View>
  )

}

const getStyles = (isMobile: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // 
    authorization: {
      width: (isMobile ? 90 : 60) + '%',
      paddingVertical: 30,
      paddingHorizontal: 20,
    },
    'authorization--theme': {
      borderColor: '#27569C',
      borderWidth: 5,
      borderRadius: 4,
      color: '#27569C',
    },
    authorization__title: {
      textAlign: 'center',
      paddingVertical: 20,
    },
    'authorization__title--theme': {
      fontSize: 24,
      fontWeight: '800',
      color: '#27569C',
    },
    // 
    input_group: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input_group__label: {
      fontSize: 24,
      fontWeight: 'bold',
      width: (isMobile ? 100 : 33) + '%',
      paddingBottom: isMobile ? 10 : 0,
    },
    input_group__text_input: {
      fontSize: 24,
      height: '45px',
      width: (isMobile ? 100 : 66) + '%',
    },
    'input_group__text_input--theme': {
      borderWidth: 4,
      borderRadius: 10,
      borderColor: '#27569C',
      backgroundColor: '#D9D9D9',
    },
    input_group__error: {
    },
    'input_group__error--theme': {
      color: 'red',
    },
    input_group__submit: {
      width: (isMobile ? 100 : 33) + '%',
      alignSelf: 'center',
    },
    'input_group__submit--theme': {
      backgroundColor: '#E4B062',
      borderRadius: 5,
    }
  })
}
