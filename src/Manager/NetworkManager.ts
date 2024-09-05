import { AppConstants } from "../Theme/constants";
import { AppLogger } from "../Theme/utils"

import axios from 'axios';
import { DataManager } from "./DataManager";

const statusCode = {
    success: 0,
    failure: 1,
    serverDown: 2,
    unAuthenticated: 3
}

const NetworkRequest = axios.create({
    baseURL: AppConstants.networkConfig.basUrl,
    timeout: AppConstants.networkConfig.timeout,
})

NetworkRequest.interceptors.request.use(async config => {
    let accessToken = await DataManager.getAccessToken()
    AppLogger("API CONFIG", config)
    if (accessToken) {
        config.headers['x-access-token'] = `${accessToken}`
    } else {
        let guid = await DataManager.getGUID()
        if (guid) {
            config.headers['x-access-device'] = `${guid}`
        } else {

        }
    }
    return config
})

export const NetworkManager = {
    GET(url: string) {
        AppLogger('GET Request Started', url)
        return NetworkRequest.get(url)
            .then(data => {
                AppLogger('GET Request then', data)
                if (data.status == 200) {
                    AppLogger('GET Request 200')
                    return {
                        data: data.data,
                        status: data.status
                    }
                } else {
                    return {
                        error: { message: "Something went wrong" },
                        status: 0
                    }
                }
            })
            .catch(e => {
                AppLogger('GET Request Catch Data', e.response.data);    // ***
                AppLogger('GET Request Catch Status', e.response.status);  // ***
                return {
                    error: e.response.data,
                    status: e.response.status
                }
            })
    },
    POST(url: string, body: any) {
        AppLogger('POST Request Started', body, url)
        return NetworkRequest.post(url, body)
            .then(data => {
                AppLogger('POST Request Then', data)
                if (data.status == 200 || data.status == 203) {
                    return {
                        data: data.data,
                        status: data.status
                    }
                } else {
                    return {
                        error: { message: "Something went wrong" },
                        status: 0
                    }
                }
            })
            .catch(e => {
                AppLogger('POST Request Catch Data', e);    // ***
                AppLogger('POST Request Catch Status', e.response.status);  // ***
                return {
                    error: e.response.data,
                    status: e.response.status
                }
            })
    }
}