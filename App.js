import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as sdk from "matrix-js-sdk";

export default function App() {
  this.context.page = <Login />;
  getData("Prefreces").then(prefs => {
    if (prefs === null) {
    } else {
      prefs = JSON.parse(prefs);
    }
  });
  return (
    <View style={styles.container}>
      {this.context.page}
      <StatusBar style="auto" />
    </View>
  );
}

const Login = () => {
  const [warn, changeWarn] = React.useState("");
  const [id, onChangeId] = React.useState("@aras14:matrix.org");
  const [pass, onChangePass] = React.useState("yORe29*RU#0G");
  return (
    <View>
      <Text>Login:</Text>
      <TextInput value={id} placeholder="ID" onChangeText={onChangeId} />
      <TextInput
        value={pass}
        placeholder="Password"
        onChangeText={onChangePass}
      />
      <Button title="Login" onPress={() => login(id, pass, changeWarn)} />
      <LoginWarn message={warn} />
    </View>
  );
};

const LoginWarn = props => {
  return (
    <View>
      <Text>{props.message}</Text>
    </View>
  );
};

const login = (id, pass, errs) => {
  let [user, domain] = id.split(":");
  user = user.replace("@", "");
  var matrix = sdk.createClient("https://" + domain);
  matrix
    .loginWithPassword(user, pass)
    .then(result => {
      this.context.page = <Setup />;
    })
    .catch(err => {
      console.log(err + "");
      switch (err + "") {
        case "M_FORBIDDEN: Invalid password":
          errs("Wrong Password.");
          break;
        default:
          errs(err + "");
      }
    });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
const getData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.warn(e);
  }
};
const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.warn(e);
  }
};
