import { Alert } from "react-native"; 
type HeadersInit = Headers | string[][] | Record<string, string> | undefined;

export const NetworkManager = {
    GET(url: string) {
        // AppLogger('GET Request Started', url)
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    console.log(`Error Status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                console.log('response in restApi: ', json);
                Alert.alert(json?.message)
                return json;
            })
            .catch((err) => console.log('error in catch==>>', err))
    },
   
    POST(url: string, body: any, isFormData?: boolean, token?: string ) {
        
        console.log('POST Request Started', JSON.stringify(body), url)
        const headers: HeadersInit = isFormData
        ? { 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          }
        : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        return fetch(url, {
            method: 'POST',
            headers: headers,
            body: isFormData ? body : JSON.stringify(body),
            
        })
            .then(response => {    
                            
                if (!response.ok) {
                    console.log(`Error Status: ${response.status}`);
                    // console.log(`Error Status response only: ${JSON.stringify(response)}`);

                }
                return response.json();
            })
            .then(json => {
                // console.log('response in restApi: ', json);
                return json;
            })
            .catch((err) => {
                console.log('error in catch==>>', err)
                throw err;  
        })        
    }
}