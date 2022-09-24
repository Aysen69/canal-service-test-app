import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Post as PostType } from "../models/TypicodeCom";
import * as Device from "expo-device";
import Photo from "./Photo";
import { Text, View } from "./Themed";
import User from "./User";

export default function Post(props: { data: PostType }) {

  const [isMobile, setIsMobile] = useState<boolean>(true)
  const [styles, setStyles] = useState(getStyles(isMobile))

  useEffect(() => {
    Device.getDeviceTypeAsync().then((deviceType) => {
      setIsMobile([Device.DeviceType.PHONE, Device.DeviceType.UNKNOWN].includes(deviceType))
    })
  }, [])

  useEffect(() => {
    setStyles(getStyles(isMobile))
  }, [isMobile])

  return (
    <View style={[styles.post, styles.post__border, styles['post__border--theme']]}>
      <Photo userId={props.data.userId}/>
      <br />
      <User id={props.data.userId}/>
      <br />
      <Text style={styles.baseText}>Title: {props.data.title}</Text>
      <br />
      {!isMobile ? <Text style={styles.baseText}>{props.data.body}</Text> : <></>}
    </View>
  )

}

const getStyles = (isMobile: boolean) => {

  return StyleSheet.create({
    post: {
      padding: 10,
      width: (!isMobile ? 48 : 90) + '%',
      height: (!isMobile ? 43 : 30) + 'vh',
    },
    post__border: {
      marginLeft: (!isMobile ? 4 / 3 : 10 / 2) + '%',
      marginBottom: 10,
    },
    'post__border--theme': {
      borderColor: '#27569C',
      borderWidth: 5,
    },
    baseText: {
      fontWeight: '800',
      fontSize: 16,
    },
  })

}
