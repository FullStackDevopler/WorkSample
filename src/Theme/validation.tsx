export const validation = (input: any, type: any) => {
    console.log("type and input==>", type,':', input);
    switch (type) {
        case 'password':

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/
            return passwordRegex.test(input);

        case 'email':
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(input);

            case 'username':
                const userNameRegex = /[^A-Za-z0-9]/
                return !userNameRegex.test(input);

    }
}

export const alphabetRegex = /^[a-zA-Z ]+$/;
export const numberRegex = /^[0-9+ -]+$/;
export const weightRegexx = /^[0-9.]+$/;
export const zeroRegex = /^0+$/;
export const weightRegex = /^[a-zA-Z0-9. ]+$/;
export const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
export const emojiRegex = /[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;