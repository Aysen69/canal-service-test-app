/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import AuthorizationScreen from '../screens/AuthorizationScreen';
import PostsScreen from '../screens/PostsScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import * as Device from 'expo-device'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function Logo() {
  const [isMobile, setIsMobile] = React.useState<boolean>(true)
  const scale = 1.5
  const [width, setWidth] = React.useState<number>()
  const height = 63 / scale

  React.useEffect(() => {
    Device.getDeviceTypeAsync().then((deviceType) => {
      setIsMobile([Device.DeviceType.PHONE, Device.DeviceType.UNKNOWN].includes(deviceType))
    })
  }, [])

  React.useEffect(() => {
    setWidth(isMobile ? 70 / scale : 273 / scale)
  }, [isMobile])

  return <Image style={{ width: width, height: height, marginLeft: 20 }} source={require('../assets/images/canal-service-logo-' + (isMobile ? 'phone' : 'tablet') + '.png')}/>
}

function LogoutButton(props: { onPress: () => void }) {
  const scale = 1.5
  return <Pressable
    onPress={props.onPress}
    style={({ pressed }) => ({
      opacity: pressed ? 0.5 : 1,
    })}>
    <Image style={{ width: 62.08 / scale, height: 55.82 / scale, marginRight: 20 }} source={require('../assets/images/logout-icon.png')}/>
  </Pressable>
}

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Authorization"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Authorization"
        component={AuthorizationScreen}
        options={({ navigation }: RootTabScreenProps<'Authorization'>) => ({
          title: 'Authorization',
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          tabBarStyle: {
            display: 'none'
          },
          headerTitleStyle: {
            display: 'none'
          },
          headerStyle: {
            backgroundColor: '#E4B062',
          },
          headerLeft: () => <Logo/>,
        })}
      />
      <BottomTab.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation }: RootTabScreenProps<'Posts'>) => ({
          title: 'Posts',
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          tabBarStyle: {
            display: 'none'
          },
          headerTitleStyle: {
            display: 'none'
          },
          headerStyle: {
            backgroundColor: '#E4B062',
          },
          headerLeft: () => <Logo/>,
          headerRight: () => <LogoutButton onPress={() => navigation.navigate('Authorization')}/>,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
