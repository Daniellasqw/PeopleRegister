import { StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper';
import { ItypeTitles } from "~/src/dtos";


export const TitleOrSubtitle = ({ title, subtitle, sizetitle, sizeSubtitle }: ItypeTitles) => {
  return (
    <View style={styles.container} >
      {
        title ? <Text style={sizetitle ? [styles.title, { fontSize: sizetitle }] : styles.title}>{title}</Text> : null
      }
      <Text style={sizeSubtitle ? [styles.subtitle, { fontSize: sizeSubtitle }] : styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 5
  },

  title: {
    fontSize: 16,

    fontFamily: "Raleway",
  },
  subtitle: {
    color: 'grey',
    fontSize: 15,
    fontFamily: "Raleway",
  },
});