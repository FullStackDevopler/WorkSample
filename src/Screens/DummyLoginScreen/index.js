import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '../../Components/TextField';
import { Images } from '../../Assets';
import Button from '../../Components/Button';
import { StringConstants } from '../../Theme/StringConstants';
import { validation } from '../../Theme/validation';
import { useDispatch, useSelector } from 'react-redux';
import { signInAction } from '../../Redux/Actions/userActions';
import VerifyEmailModal from '../../Modals/VerifyEmailModal';
import { deleteSignInResponse } from '../../Redux/Reducers/userInfoSlice';
import { AppConstants } from '../../Theme/AppConstants';
import LoaderModal from '../../Modals/LoaderModal';


export default function DummyLoginScreen({ navigation }) {
  const dispatch = useDispatch()
  const [showEmailVerifyModal, setShowEmailVerifyModal] = useState(false)
  const isLoading = useSelector((state) => state?.persistedReducer.userData.isLoading)
  const signInResponse = useSelector((state) => state?.persistedReducer.userData.signInResponse);
  const errorMessage = useSelector((state) => state?.persistedReducer.userData.error)

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email id')
      .required('Please enter your email ID')
      .test('email-regex', 'Invalid email', value => {
        return validation(value, 'email');
      }),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Please enter the password')
      .test('password-regex', StringConstants.PASSWORD_VALIDATION, value => {
        return validation(value, 'password');
      }),
  });

  useEffect(() => {
    if (!isLoading && signInResponse?.email) {
      setShowEmailVerifyModal(true)
    }

  }, [signInResponse])


  useEffect(() => {
    if (errorMessage != null && !isLoading) {
      setShowValidationModal(true)
      setAlertTitle(`${errorMessage}`)

    }

    return () => {
      console.log('in login return useEffect');
      dispatch(deleteSignInResponse('error'))
    }

  }, [errorMessage])

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({

    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      let myFormData = new FormData();
      myFormData.append('email', values.email);
      myFormData.append('password', values.password);
      dispatch(signInAction(myFormData));
    },

  });

  const handleValidateForm = () => {
    if (errors.email && touched.email) {
      console.log('Email error:', errors.email);
      Alert.alert('Error', errors.email);
    } else if (errors.password && touched.password) {
      console.log('Password error:', errors.password);
      Alert.alert('Error', errors.password);
    } else {
      console.log('Form values:', values);
    }
    handleSubmit()
  }


  const hideEmailVerifyModal = () => {
    dispatch(deleteSignInResponse('signInResponse'));
    setShowEmailVerifyModal(false)
  }


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {isLoading &&
        <LoaderModal showModal={isLoading} />
      }
      {showEmailVerifyModal &&
        <VerifyEmailModal
          showModal={showEmailVerifyModal}
          hideModal={hideEmailVerifyModal}
          tapOnConfirm={() => {
            dispatch(deleteSignInResponse('signInResponse'));
            setShowEmailVerifyModal(false)

            navigation.navigate(AppConstants.screens.OTP_VERIFICATION,
              {
                email: signInResponse?.email,
                otp: signInResponse?.otp,
                userId: signInResponse?.userId
              })
          }}
        />
      }

      <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 30 }}>
        {StringConstants.LOGIN_NOW}
      </Text>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <TextField
          leftImage={Images.IC_MAIL}
          leftIconStyles={{ tintColor: 'black' }}
          placeholder='Enter your email'
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          error={errors.email}
          touched={touched.email}
          returnKeyType='next'
        />
        {/* {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>} */}

      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <TextField
          leftImage={Images.IC_CHANGE_PASSWORD}
          placeholder='Enter your password'
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          secureTextEntry
          error={errors.password}
          touched={touched.password}
          returnKeyType='go'
        />
        {/* {errors.password && touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>} */}

      </View>
      <Button primaryTitle={StringConstants.LOGIN} onPress={handleValidateForm} />
    </View>
  );
}