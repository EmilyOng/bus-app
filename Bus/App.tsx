import * as eva from '@eva-design/eva';
import { ApplicationProvider, StyleService, Text } from '@ui-kitten/components';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView>
        <View style={styles.navbar}>
          <Text category="h1" status="control">
            巴士
          </Text>
        </View>
      </SafeAreaView>
    </ApplicationProvider>
  );
}

const styles = StyleService.create({
  navbar: {alignItems: 'center', backgroundColor: '#ffa421'},
});

export default App;
