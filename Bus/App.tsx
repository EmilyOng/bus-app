import * as eva from "@eva-design/eva";
import { ApplicationProvider, StyleService, Text } from "@ui-kitten/components";
import BusArrivalModal from "components/BusArrivalModal";
import { BUS_STOPS } from "data";
import { DisplayBusStop } from "models/bus";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView>
        <View>
          <Text category="h1" style={styles.navbar}>
            巴士
          </Text>
          <ScrollView style={styles.container}>
            {BUS_STOPS.map((busStop: DisplayBusStop) => {
              return <BusArrivalModal key={busStop.Code} BusStop={busStop} />;
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

const styles = StyleService.create({
  container: {
    display: "flex",
    backgroundColor: "#ffffff",
    marginTop: 20,
    width: "100%"
  },
  navbar: {
    textAlign: "center",
    backgroundColor: "#ffa421",
    color: "#ffffff",
    padding: 8,
  },
});

export default App;
