import { View,Text, Pressable,StyleSheet } from "react-native";
import { GlobalStyles } from "../../cosntants/GlobalStyles";


function CustomButton({children,onPress,mode,style}){
   return (
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.button_text, mode === 'flat' && styles.flat_text]}>
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
)
}

export default CustomButton;

const styles = StyleSheet.create({
    button:{
        borderRadius:4,
        padding:6,
        backgroundColor:GlobalStyles.COLORS.PRIMARY500
    },
    flat:{
        backgroundColor:'transparent',
    },
    button_text:{
        color:'white',
        textAlign:'center',
    },
    flat_text:{
        color:GlobalStyles.COLORS.PRIMARY200,
    },
    pressed:{
        opacity:0.75,
        backgroundColor:GlobalStyles.COLORS.PRIMARY100,
        borderRadius: 4
    },
})