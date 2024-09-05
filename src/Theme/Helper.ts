export const timeSlots = [
    { label: 'ASAP', value: 'ASAP' },
    { label: 'Between', value: 'Between' },
    { label: 'Before', value: 'Before' },
  ]

  export const timeSlots2 = [
    { label: 'Between', value: 'Between' },
    { label: 'Before', value: 'Before' },
  ]


  //we get vehicle types from the API, not from here
 export const vehichleTypes = [
    { label: 'Car', value: 'Car' },
    { label: 'Van', value: 'Van' },
    { label: 'Luton Van', value: 'Luton Van' },
    { label: '7.5T Truck', value: '7.5T Truck' },
    { label: '12T Truck', value: '12T Truck' },
  ]

 export const pickupItems = [
    { label: 'Boxes', value: 'Boxes' },
    { label: 'Pallets', value: 'Pallets' },
    { label: 'Euro Pallets', value: 'Euro Pallets' },
  ]

  export const selectYesNo = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]


  export function capitalizeFirstLetter(str: string) {
    return str?.replace(/\b\w/g, match => match.toUpperCase());
  }

  export function numberWithCommas(x: any) {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }


  // export function formatPhoneNumber(phoneNumber: any){
  //   // Remove extra spaces and leading '+91'
  //   const formattedNumber = phoneNumber.replace(/\s+/g, '').replace(/^(\+91)/, '');
  //   console.log('formattedNumber==>>>',formattedNumber);
    
  //   return formattedNumber;
  // };
  

  export const addWeights = (locations: any) => {
    let totalWeight = 0;

    locations.forEach((location: any) => {
      // console.log('item in addWeights', location);
      
        const weight = Number(location.weight); // Convert weight to number

        // Check if weight is a valid number and not NaN
        if (!isNaN(weight) && typeof weight === 'number') {
            totalWeight += weight;
        }
    });

    return totalWeight;
};