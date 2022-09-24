import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import TypicodeCom, { User as UserType } from "../models/TypicodeCom";
import { Text } from "./Themed";

const typicodeCom = new TypicodeCom()

export default function User(props: { id: number }) {

  const [user, setUser] = useState<UserType | undefined>()

  useEffect(() => {
    typicodeCom.getUser(props.id).then(setUser)
  }, [])

  return (
    <>
    <Text style={styles.baseText}>Author: {user ? user.name : ''}</Text>
    <br />
    <Text style={styles.baseText}>Company: {user ? user.company.name : ''}</Text>
    </>
  )

}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 16,
    fontWeight: '800'
  },
})
