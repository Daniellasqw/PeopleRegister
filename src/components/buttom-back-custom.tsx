import { Dimensions, View } from "react-native"
import { Button } from "react-native-paper"
import { ButtomCustomNext } from "~/src/dtos"

export const ButtomBackCustom = ({ value, setNext }: ButtomCustomNext) => {

    return (
        <View style={{ alignItems: "flex-start" }}>
            <View style={{ width: Dimensions.get("screen").width / 3 }}>
                <Button icon={"arrow-left"} textColor="#fff" style={{ borderRadius: 8 }} buttonColor={"#7d7f9e"} onPress={() => setNext(value - 1)}>Voltar </Button>
            </View>
        </View>
    )
}