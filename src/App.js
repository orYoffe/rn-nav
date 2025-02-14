import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  Animated,
  Easing,
  useColorScheme,
  Linking,
} from 'react-native';
import 'react-native-gesture-handler';
import logo from './logo.png';
import {NavigationContainer, Link} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Link
        to="/Settings"
        style={{
          backgroundColor: '#36a',
          color: '#eee',
          paddingHorizontal: 8,
          paddingVertical: 6,
        }}>
        Go to Settings
      </Link>
    </View>
  );
}
function SettingsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
      <Link
        to="/Home"
        style={{
          backgroundColor: '#36a',
          color: '#eee',
          paddingHorizontal: 8,
          paddingVertical: 6,
        }}>
        Go to Home
      </Link>
    </View>
  );
}
const isNative = Platform.OS !== 'web';

const Root = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
      <View
        style={{
          elevation: 2,
          flexDirection: 'row',
          paddingTop: 18,
          paddingHorizontal: 8,
          paddingBottom: 6,
          marginBottom: 20,
          justifyContent: 'space-around',
          borderTopColor: '#ccc',
          borderTopWidth: 1,
        }}>
        <Link to="/Home">Home</Link>
        <Link to="/Settings">Settings</Link>
      </View>
    </>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="/" component={Root} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  const [wasRotated, setwasRotated] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const isDarkMode = useColorScheme() === 'dark';

  const onPress = () => {
    setwasRotated(!wasRotated);
    Animated.timing(spinValue, {
      toValue: wasRotated ? 0 : 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.scrollView}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Animated.Image
            source={logo}
            style={[styles.logo, {transform: [{rotate: spin}]}]}
          />
          <Text style={styles.title}>Create React Native Web App</Text>
          <Text style={styles.text}>
            Open up src/App.js to start working on your app!
          </Text>
          <Text style={styles.text}>
            Changes you make will automatically reload.
          </Text>
          {isNative && (
            <Text style={styles.text}>
              Shake your phone to open the developer menu.
            </Text>
          )}
          <Text
            style={styles.link}
            onPress={
              isNative
                ? () =>
                    Linking.openURL(
                      'https://github.com/necolas/react-native-web',
                    )
                : undefined
            }
            accessibilityRole="link"
            href="https://github.com/necolas/react-native-web"
            target="_blank">
            Click here to learn more about react native web
          </Text>

          <Pressable
            onPress={onPress}
            style={styles.button}
            underlayColor={'#0A84D0'}>
            <View>
              <Text style={styles.buttonText}>Rotate Logo</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
  },
  link: {
    color: '#1B95E0',
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
