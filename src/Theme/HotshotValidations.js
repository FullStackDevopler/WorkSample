import * as Yup from 'yup';
import { alphaNumericRegex, alphabetRegex } from './validation';

const hotshotValidationSchema = Yup.object().shape({
    noOfAddress: Yup.array().of(
      Yup.object().shape({
        findAddress: Yup.boolean(),
        location: Yup.string().when('findAddress', {
          is: true,
          then: Yup.string().required('Please select the location'),
        }),
        addressLine1: Yup.string().when('findAddress', {
          is: false,
          then: Yup.string().required('Please enter the address line 1'),
        }),
        addressLine2: Yup.string().when('findAddress', {
          is: false,
          then: Yup.string().required('Please enter the address line 2'),
        }),
        city: Yup.string().when('findAddress', {
          is: false,
          then: Yup.string()
            .min(3, 'City should be at least 3 characters long')
            .matches(alphabetRegex, 'Please enter a valid city name')
            .required('Please enter the city'),
        }),
        state: Yup.string().when('findAddress', {
          is: false,
          then: Yup.string()
            .min(3, 'State should be at least 3 characters long')
            .matches(alphabetRegex, 'Please enter a valid state name')
            .required('Please enter the state'),
        }),
        zip_code: Yup.string().when('findAddress', {
          is: false,
          then: Yup.string()
            .min(5, 'Zip code should be at least 5 characters long')
            .matches(alphaNumericRegex, 'Please enter a valid zip code')
            .required('Please enter the zip code'),
        }),
     
        latitude: Yup.number().when(['findAddress', 'longitude'], {
            is: (findAddress, longitude) => {
              return findAddress === false && longitude === 0;
            },
            then: Yup.number().min(1, 'Please select the location using drop pin'),
          }),
      

        // latitude: Yup.number().when(['findAddress', 'longitude'], {
        //   is: (findAddress, longitude) => findAddress && longitude === 0,
        //   then: Yup.number().min(1, 'Please select the location using drop pin'),
        // }),
        // longitude: Yup.number().when(['findAddress', 'latitude'], {
        //   is: (findAddress, latitude) => findAddress && latitude === 0,
        //   then: Yup.number().min(1, 'Please select the location using drop pin'),
        // }),
      })
    ),
    time: Yup.string().required('Please select the pickup time'),
    price: Yup.string()
      .required('Please enter the price')
      .matches(/^\d+(\.\d{1,2})?$/, 'Please enter a valid price'),
    selectedVehicle: Yup.string().required('Please select the vehicle'),
  });
  


export default hotshotValidationSchema;
