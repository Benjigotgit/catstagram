import { View, Text, StyleSheet, TextInput, TextStyle } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form';

interface ControllerTextInputProps{
  name: string;
  rules: Rule;
  control: any;
  errors: any
  onChangeText: Function
  label?: string
  width?: any;
  height?: any;
  labelStyles?: TextStyle,
  errorStyles?: TextStyle,
  placeholder?: string
  defaultValue?:  any
}

interface Rule {
  required: boolean
  pattern: {
    value: any,
    message: string
  }
}


export const ControllerTextInput = (props: ControllerTextInputProps) => {
  return (
  <Controller 
    control={props.control}
    name={props.name} 
    defaultValue={props.defaultValue}
    rules={props.rules}
    render={({ field: { onChange, value } }) => (
      <View style={[styles.inputContainer]}>
        {props.label && <Text style={props.labelStyles ? props.labelStyles : styles.label}>{props.label}</Text>}
        <TextInput
          placeholder={props.placeholder}
          value={value}
          onChangeText={(val) => {props.onChangeText(val); onChange(val)}}
          style={styles.input} />
        <Text style={props.errorStyles ? props.errorStyles : styles.error}>
          {props.errors[props.name] ? props.errors[props.name].message : null}
        </Text>
      </View>
    )}      
  />
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%'
  },
  label: {
    alignSelf: 'flex-start'
  },
  inputContainer: {
    width:'80%',

  },
  error: {

  },
  input: {
    color: 'black',
    fontSize: 15,
    height: 37,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: '100%',
    marginTop: 10,
  }
})
