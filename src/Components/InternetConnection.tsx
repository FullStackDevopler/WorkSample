import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export const checkInternetConnection = async (): Promise<boolean> => {
  try {
    const state: NetInfoState = await NetInfo.fetch();
    // console.log('state in checkInternetConnection==>>>',state.isConnected);
    
    return state?.isConnected || false;
  } catch (error) {
    console.error('Error checking internet connection:', error);
    return false;
  }
};
