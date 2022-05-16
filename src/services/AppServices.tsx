import {Alert, AlertButton, AlertOptions} from 'react-native';
import { AppAction } from 'redux/actions/AppAction';
import { ReduxDispatcher } from 'redux/services/redux-dispatcher';
import Toast from 'react-native-simple-toast'

export class AppService {
    static showLoading = (message?: string) => {
        console.log('message', message)
        ReduxDispatcher.getInstance().dispatch(AppAction.LOADING, {
            loading: true,
            message: message,
        });
    };
    
    static hideLoading = () => {
        ReduxDispatcher.getInstance().dispatch(AppAction.LOADING, {
            loading: false,
            message: undefined,
        });
    };

    static showAlert = (
        title: string,
        message?: string,
        buttons?: AlertButton[] | undefined,
        options?: AlertOptions | undefined,
    ) => {
        Alert.alert(title, message, buttons, options);
    };

    static showToast = (message: string, delay?: number) => { 
        //setTimeout is used because hide/showLoading interfere with showToast
        //delay time are to be short, however it is system/performace specific, this does not happen on all machines.
        setTimeout(() => {
            Toast.show(message, Toast.SHORT)
        }, delay)
    }

}
