import { Pressable,View,StyleSheet } from "react-native";
import {Ionicons} from '@expo/vector-icons';

function IconButton({icon,color,size,buttonPress}){
    return(
        <Pressable onPress={buttonPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.button_container}>
                <Ionicons name={icon} size={size} color={color}/>
            </View>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    button_container:{
        borderRadius:24,
        padding:6,
        marginHorizontal:8,
        marginVertical:3,
    },
    pressed:{
        opacity:0.75
    }
});