#!/bin/sh

rm -rf node_modules
npm install expo expo-status-bar react react-native @react-native-async-storage/async-storage react-dom react-native-web firebase @react-navigation/native @react-navigation/stack axios
npx expo install @expo/metro-runtime expo-navigation-bar expo-auth-session expo-web-browser
