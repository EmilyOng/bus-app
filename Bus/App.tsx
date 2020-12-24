import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, StyleService, Text} from '@ui-kitten/components';
import {View, ScrollView} from 'react-native';
import BusModal from './BusModal';
import {default as mapping} from './mapping.json';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light} customMapping={mapping}>
      <View style={styles.navbar}>
        <Text category="h1" status="control">
          巴士
        </Text>
      </View>
      <ScrollView>
        <BusModal busStopCode="84479" />
        <BusModal busStopCode="84471" />
        <BusModal busStopCode="84359" />
        <BusModal busStopCode="84009" />
        <BusModal busStopCode="84491" />
      </ScrollView>
    </ApplicationProvider>
  );
};

const styles = StyleService.create({
  navbar: {alignItems: 'center', backgroundColor: '#ffa421'},
});

export default App;
