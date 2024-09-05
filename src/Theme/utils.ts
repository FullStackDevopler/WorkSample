import DeviceInfo from "react-native-device-info"
import { Platform } from "react-native"
import Reactotron from './../../ReactotronConfig';
const CAN_CONSOLE = true
export const getBottomSpace = () => {
    return Platform.OS === 'ios' ? DeviceInfo.hasNotch() ? 0 : 10 : 10
}

export const AppLogger = (...args) => {
    if (CAN_CONSOLE) {
        // console.tron = Reactotron
        // console.tron.log("********\n")
        console.log(...args)
        // console.tron.log("**********")
    }
}

export const isValidEmail = (email: string) => {
    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Test the provided email against the regex
    return emailRegex.test(email);
}

export const isValidNonEmptyString = (value: string) => {
    return typeof value === 'string' && value.trim() !== '';
}

export const isValidStringLength = (value: string, minLength: number, maxLength: number) => {
    if (typeof value !== 'string') {
        return false; // Not a string
    }
    const length = value.trim().length;
    if (minLength !== undefined && length < minLength) {
        return false; // Below the minimum length
    }

    if (maxLength !== undefined && length > maxLength) {
        return false; // Exceeds the maximum length
    }

    return true; // Valid string within the specified length range
}

export const generateGUID = () => {
    const timestamp = new Date().getTime().toString(16); // Convert timestamp to hexadecimal string
    const randomPart = Math.floor(Math.random() * 1000000).toString(16); // Generate a random part
    const guid = timestamp + '-' + randomPart;
    return guid;
}

export const processErrorJsonResponse = (jsonResponse) => {
    const response = jsonResponse.response;
    const message = jsonResponse.message;
    const errors = jsonResponse.message.errors;

    if (typeof message === 'string') {
        // If the "message" is a string, return it as is
        return message;
    } else if (Array.isArray(message)) {
        // If the "message" is an array, join its elements into a string and return
        return message.join(', ');
    } else if (typeof message === 'object') {
        if (errors && typeof errors === 'object') {
            // If there are multiple errors, return an array of errors
            let errorsArray: any[] = Object.values(errors).map((error: any) => error.message);
            return errorsArray?.length > 0 ? errorsArray[0] : "Something went wrong"
        } else if (message.hasOwnProperty('message')) {
            // If "message" is an object with a "message" property, return it
            return message.message;
        } else {
            // If "message" is an object without a "message" property, stringify the object and return
            return JSON.stringify(message);
        }
    } else {
        // If "message" is of an unsupported type, return an error message
        return 'Unsupported message type';
    }
}

export const formatNumber = (value: number) => {
    if (Number.isInteger(value)) {
        return value?.toString(); // Convert to a string to hide the decimal point.
    } else {
        return value?.toFixed(1); // Show up to 2 decimal places for non-integer values.
    }
}

//Calculate score from words array
export const calculateScore = (arr: any[]) => {
    let totalCount = 0;
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'string') {
            totalCount += arr[i].length;
        }
    }
    return totalCount;
}

export const wordIncludesAllLetters = (word, lettersArray) => {
    // Convert the word to lowercase (or uppercase) for a case-insensitive search
    let lowercaseWord = word.toLowerCase();

    // Loop through the letters in the array
    for (const letter of lettersArray) {
        // Convert the letter to lowercase (or uppercase) for a case-insensitive search
        const lowercaseLetter = letter.toLowerCase();

        // Check if the lowercaseWord includes the lowercaseLetter
        if (!lowercaseWord.includes(lowercaseLetter)) {
            return false; // Word does not include one of the letters
        } else {
            lowercaseWord = lowercaseWord.replace(lowercaseLetter, '');
        }
    }
    return true; // Word includes all the letters
}

export const searchInJSONFile = async (fileName: string, searchTerm: string) => {
    const jsonFiles: any = {
        A: require('./../Dictionary/A_Doggy_Words_Dictionary.json'),
        B: require('./../Dictionary/B_Doggy_Words_Dictionary.json'),
        C: require('./../Dictionary/C_Doggy_Words_Dictionary.json'),
        D: require('./../Dictionary/D_Doggy_Words_Dictionary.json'),
        E: require('./../Dictionary/E_Doggy_Words_Dictionary.json'),
        F: require('./../Dictionary/F_Doggy_Words_Dictionary.json'),
        G: require('./../Dictionary/G_Doggy_Words_Dictionary.json'),
        H: require('./../Dictionary/H_Doggy_Words_Dictionary.json'),
        I: require('./../Dictionary/I_Doggy_Words_Dictionary.json'),
        J: require('./../Dictionary/J_Doggy_Words_Dictionary.json'),
        K: require('./../Dictionary/K_Doggy_Words_Dictionary.json'),
        L: require('./../Dictionary/L_Doggy_Words_Dictionary.json'),
        M: require('./../Dictionary/M_Doggy_Words_Dictionary.json'),
        N: require('./../Dictionary/N_Doggy_Words_Dictionary.json'),
        O: require('./../Dictionary/O_Doggy_Words_Dictionary.json'),
        P: require('./../Dictionary/P_Doggy_Words_Dictionary.json'),
        Q: require('./../Dictionary/Q_Doggy_Words_Dictionary.json'),
        R: require('./../Dictionary/R_Doggy_Words_Dictionary.json'),
        S: require('./../Dictionary/S_Doggy_Words_Dictionary.json'),
        T: require('./../Dictionary/T_Doggy_Words_Dictionary.json'),
        U: require('./../Dictionary/U_Doggy_Words_Dictionary.json'),
        V: require('./../Dictionary/V_Doggy_Words_Dictionary.json'),
        W: require('./../Dictionary/W_Doggy_Words_Dictionary.json'),
        X: require('./../Dictionary/X_Doggy_Words_Dictionary.json'),
        Y: require('./../Dictionary/Y_Doggy_Words_Dictionary.json'),
        Z: require('./../Dictionary/Z_Doggy_Words_Dictionary.json'),
    };
    try {
        const jsonData = jsonFiles[fileName];
        const resultObject = jsonData.find(obj => obj.word === searchTerm);
        console.log("Search Object", resultObject)
        return resultObject;
    } catch (error) {
        console.error(`Error reading or parsing JSON from ${fileName}:`, error);
        return [];
    }
}

