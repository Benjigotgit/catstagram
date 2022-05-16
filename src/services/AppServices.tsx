import {Alert, AlertButton, AlertOptions} from 'react-native';
import { AppAction } from 'redux/actions/AppAction';
import { ReduxDispatcher } from 'redux/services/redux-dispatcher';

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

    static showError = (titleText?: string, message?: string) => {
        ReduxDispatcher.getInstance().dispatch(AppAction.ERROR, {
            visible: true,
            title: titleText,
            error: {errorMessage: message},
        });
    };

    static hideError = () => {
        ReduxDispatcher.getInstance().dispatch(AppAction.ERROR, {
            visible: false,
        });
    };
}
