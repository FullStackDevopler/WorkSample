import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import Header from '../../Components/Header'
import { WebView } from 'react-native-webview';
import LoaderModal from '../../Modals/LoaderModal'


export default function WebViewScreens({ navigation, route }: any): React.JSX.Element {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
    }, [])

    

    return (
        <View style={styles.rootContainer}>
            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }
            <Header tapOnBack={() => navigation.goBack()}
                headerText={route?.params?.title}
            />
            <View style={{ flex: 1 }}>
                <WebView source={{ uri: route?.params?.url }} onLoad={()=>setIsLoading(false)} />
            </View>
        </View>
    )
}

