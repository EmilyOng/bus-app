import React, {useState, useEffect} from 'react'
import {
  StyleService,
  Text,
  Button,
  Layout,
  Card,
  List,
  ListItem,
  Spinner,
} from '@ui-kitten/components'
import Modal from 'react-native-modal'
import axios from 'axios'
import {Moment} from 'moment-timezone'

const moment = require('moment-timezone')

interface BusInfo {
  OriginCode: string
  DestinationCode: string
  EstimatedArrival: Date
  EstimatedDuration?: any
  Latitude: string
  Longitude: string
  VisitNumber: string
  Load: string
  Feature: string
  Type: string
}

interface BusStatus {
  ServiceNo: string
  Operator: string
  NextBus: BusInfo
  NextBus2: BusInfo
  NextBus3: BusInfo
}

const BusModal = (props: {busStopCode: string}) => {
  const [visible, setVisible] = useState(false)
  const [busTimings, setBusTimings] = useState<BusStatus[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const {busStopCode} = props

  const priorityServiceNo = ['66', '228', '21', '65', '22']

  const minutestoArrival = (arrivalTime: Date) => {
    const currentTime: Moment = moment().tz('Asia/Singapore')
    const arrivalTimeMoment: Moment = moment(arrivalTime).tz('Asia/Singapore')
    const duration = arrivalTimeMoment.diff(currentTime, 'minute')
    return duration
  }

  const formatArrivalDuration = (arrivalTime: Date) => {
    const duration = minutestoArrival(arrivalTime)
    return duration <= 0 ? '要到了' : `${duration} 分钟`
  }

  const compareServiceNo = (a: BusStatus, b: BusStatus) => {
    return 1 ? parseInt(a.ServiceNo) > parseInt(b.ServiceNo) : -1
  }

  const locations: {[key: string]: string} = {
    '84479': 'Block 713',
    '84471': 'Block 745',
    '84359': '216 巴刹',
    '84009': '勿洛 车头',
    '84491': '630 巴刹',
  }

  const colors: {[key: string]: string} = {
    '84479': 'primary',
    '84471': 'danger',
    '84359': 'warning',
    '84009': 'success',
    '84491': 'info',
  }

  useEffect(() => {
    if (visible) {
      axios
        .get(
          `http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopCode}`,
          {
            headers: {
              'Content-Type': 'application/json',
              AccountKey: 'r6oXJUS9Rb6xqBxG6x3L6A==',
            },
          },
        )
        .then((response) => {
          if (visible) {
            let busTimings_ = response.data
            busTimings_.Services.map((service: BusStatus) => {
              service.NextBus.EstimatedDuration = formatArrivalDuration(
                service.NextBus.EstimatedArrival,
              )
              service.NextBus2.EstimatedDuration = formatArrivalDuration(
                service.NextBus2.EstimatedArrival,
              )
              service.NextBus3.EstimatedDuration = formatArrivalDuration(
                service.NextBus3.EstimatedArrival,
              )
            })
            const [priorityBuses, remainderBuses] = busTimings_.Services.reduce((result, busService) => {
              const index = priorityServiceNo.includes(busService.ServiceNo) ? 1 : 0
              result[index].push(busService)
              return result
            }, [[], []])
            priorityBuses.sort(compareServiceNo)
            remainderBuses.sort(compareServiceNo)
            setBusTimings(remainderBuses.concat(priorityBuses))
            setIsLoading(false)
          } else {
            setIsLoading(true)
          }
        })
        .catch((error) => console.log(error))
    }
  }, [visible, busStopCode])

  const renderItem: ({ item, index }: {
    item: BusStatus
    index: number
  }) => JSX.Element = ({item, index}) => (
    <ListItem
      title={(evaProps) => (
        <Card
          {...evaProps}
          style={styles.card}
          status={item.NextBus.Load === 'SEA' ? 'success' : 'warning'}>
          <Text category="h1">{item.ServiceNo}</Text>
          <Text category="h5">{item.NextBus.EstimatedDuration}</Text>
          <Text category="h5">{item.NextBus2.EstimatedDuration}</Text>
        </Card>
      )}
    />
  )

  return (
    <Layout style={styles.container} level="1">
      <Button
        style={styles.button}
        appearance="outline"
        size="giant"
        status={colors[busStopCode]}
        onPress={() => setVisible(true)}>
        {locations[busStopCode]}
      </Button>
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}>
        <Card>
          {isLoading ? (
            <Spinner status="danger" />
          ) : (
            <List
              style={styles.container}
              data={busTimings}
              renderItem={renderItem}
            />
          )}
        </Card>
      </Modal>
    </Layout>
  )
}

const styles = StyleService.create({
  navbar: {alignItems: 'center', backgroundColor: '#ffa421'},
  container: {
    maxHeight: 600,
    minWidth: 300,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    margin: 2,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  button: {
    margin: 20,
  },
})

export default BusModal
