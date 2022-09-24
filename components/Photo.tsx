import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import TypicodeCom, { Photo as PhotoType } from "../models/TypicodeCom";
import * as Device from "expo-device";

const typicodeCom = new TypicodeCom()

export default function Photo(props: { userId: number }) {

  const [photos, setPhotos] = useState<PhotoType[]>([])
  const [isMobile, setIsMobile] = useState<boolean>(true)

  useEffect(() => {
    typicodeCom.getPhotos(props.userId).then(setPhotos)
    Device.getDeviceTypeAsync().then((deviceType) => {
      setIsMobile([Device.DeviceType.PHONE, Device.DeviceType.UNKNOWN].includes(deviceType))
    })
  }, [])

  return Array.isArray(photos) && photos.length > 0 && !isMobile ? <Image style={styles.image} source={{ uri: photos[0].thumbnailUrl }}/> : <></>

}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
});
