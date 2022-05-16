import { View, Text, TouchableOpacity, StyleSheet,  TextInput} from 'react-native'
import {useState, useEffect} from 'react'
import React from 'react'
import { ImageSelectorImageProps, UserCreation } from 'models'
import { HttpService, Apis, AppService } from 'services'

import { useForm, Controller, FieldValues } from 'react-hook-form';
import { ControllerTextInput } from 'components/ControllerTextInput'

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

            <ControllerTextInput 
              control={control}
              name={'firstName'}
              errors={errors} 
              label={'First Name:'}
              rules={{
                required: false,
                pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: 'Invalid first name',
                }
              }}
              placeholder="First name..."
              onChangeText={(val: string) => {(setValue('firstName', val))}}
            />

            <ControllerTextInput 
              control={control}
              name={'lastName'}
              errors={errors} 
              label={'Last Name:'}
              rules={{
                required: false, 
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: 'Invalid last name',
                }
              }}
              placeholder="Last name..."
              onChangeText={(val: string) => {(setValue('lastName', val))}}
            />

            <ControllerTextInput 
              control={control}
              name={'email'}
              errors={errors} 
              label={'Email:'}
              rules={{
                required: true, 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email" 
                }
              }}
              placeholder="Email..."
              onChangeText={(val: string) => {(setValue('email', val))}}
            />

            <ControllerTextInput 
              control={control}
              name={'password'}
              errors={errors} 
              label={'Password:'}
              rules={{
                required: true, 
                pattern: {
                  value:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&/,><\’:;|_~`])\S{8,99}$/,
                  message: "Your password must have * 8 characters , 1 Uppercase ,1 Lowercase , 1 Numeric 1 special character" 
                }
              }}
              placeholder="Password..."
              onChangeText={(val: string) => {(setValue('password', val))}}
            />
            
        <TouchableOpacity  onPress={handleSubmit(onSubmit)} style={styles.buttonStyles}>
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

