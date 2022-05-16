import { View, Text, TouchableOpacity, StyleSheet,  TextInput} from 'react-native'
import {useState, useEffect} from 'react'
import React from 'react'
import { ImageSelectorImageProps, UserCreation } from 'models'
import { HttpService, Apis, AppService } from 'services'

import { useForm, Controller, FieldValues } from 'react-hook-form';

export const ProfileScreen = (props: any) => {

  const [loading, setLoading] = useState<boolean>(true)

useEffect(() => {
},[])

const { control, handleSubmit, formState: { errors, isValid }, setError ,setValue, getValues } = useForm();



  const createUser = async (formData: FieldValues | UserCreation) => {  
    AppService.showLoading('...Creating User')

    try{
      const resp = await HttpService.getInstance().post(Apis.USERS, formData)
      const data = resp.data
      AppService.showAlert('User Successfully created')
      console.log('createUser()', JSON.stringify(resp))
    } catch (e){
      console.error('ERROR createUser() ', JSON.stringify(e))
      AppService.showAlert('Opps... Error', JSON.stringify(e))
    }
    AppService.hideLoading()

    setLoading(false)
  }

  const onSubmit = async (data: FieldValues | UserCreation) => {
    if(errors.email || errors.password || errors.firstName || errors.lastName) 
    return AppService.showAlert('Please recheck form', '*Password and Email are required*')
    createUser(data)
  }

  return (
    <View style={styles.container}>

    <View style={styles.uploadCommentContainer}>
      <Controller 
          control={control}
          name={'firstName'} 
          rules={{
            required: false,
            pattern: {
                value: /^[a-zA-Z ]*$/,
                message: 'Invalid first name',
            }
        }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
                            <Text style={styles.labelStyles}>First Name:</Text>

              <TextInput
                placeholder="First Name..."
                value={value}
                onChangeText={(val) => {onChange(val);(setValue('firstName', val))}}
                style={styles.inputStyle} />
              <Text style={styles.errorStyles}>{errors['firstName'] && errors['firstName'].message}</Text>

            </View>
          )}      />

     
      <Controller 
          control={control}
          name={'lastName'} 
          rules={{
            required: false,
            pattern: {
                value: /^[a-zA-Z ]*$/,
                message: 'Invalid last name',
            }
        }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
                            <Text style={styles.labelStyles}>Last Name:</Text>

              <TextInput

                placeholder="Last name..."
                value={value}
                onChangeText={(val) => {onChange(val);(setValue('lastName', val))}}
                style={styles.inputStyle} />
              <Text style={styles.errorStyles}>{errors['lastName'] && errors['lastName']['message']}</Text>

            </View>
          )}      />

<Controller 
          control={control}
          name={'email'} 
          rules={{
            required: true, 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email" 
            }
          }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
                            <Text style={styles.labelStyles}>Email:</Text>

              <TextInput
                placeholder="Email..."
                value={value}
                onChangeText={(val) => {onChange(val);setValue('email', val)}}
                style={styles.inputStyle} />
              <Text style={styles.errorStyles}>{errors['email'] && errors['email']['message']}</Text>

            </View>
          )}      />

     
      <Controller 
          control={control}
          name={'password'} 
          rules={{
            required: true, 
            pattern: {
              value:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&/,><\’:;|_~`])\S{8,99}$/,
              message: "Your password must have * 8 characters , 1 Uppercase ,1 Lowercase , 1 Numeric 1 special character" 
            }
          }}
        
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyles}>Password:</Text>
              <TextInput
                placeholder="Password..."
                value={value}
                onChangeText={(val) => {onChange(val);(setValue('password', val))}}
                style={styles.inputStyle} />
              <Text style={styles.errorStyles}>{errors['password'] && errors['password']['message']}</Text>

            </View>
          )}      />

      <TouchableOpacity  onPress={handleSubmit(onSubmit)} 
        style={styles.buttonStyles
      }>
        <Text style={styles.textStyles}>Create User</Text>
      </TouchableOpacity>


    </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  uploadCommentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20
  },
  inputStyle: {
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
  },
  labelStyles: {
    alignSelf: 'flex-start'
  },
  errorStyles: {
    color: 'red',
    alignSelf: 'flex-start',
    height: 50,
  },
  inputContainer: {
    width:'80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyles: {
    backgroundColor: '#0397f6',
    width: '80%',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 35,
  },
  textStyles: {
    color: 'white',
    fontWeight: 'bold'
  },
})

