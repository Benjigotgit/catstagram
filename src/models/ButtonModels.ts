import { TouchableOpacityProps, TextStyle} from "react-native";

export interface CustomButtonProps{
    onPress?: Function;
    text?: string;
    textStyles?: TextStyle;
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    height?: any,
    width?: any
    disable ?: boolean,
    disableBorderColor?:string,
    disableTextColor?:string,
    disableBackgroundColor?:string,
    borderRadius?: number,
  
}