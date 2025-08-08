import { Button, Card, Layout, Modal, StyleService } from "@ui-kitten/components";
import { useState } from "react";
import BusArrivalCard from "./BusArrivalCard";
import { DisplayBusStop } from "models/bus";

interface BusArrivalModalProps {
    BusStop: DisplayBusStop
}

const BusArrivalModal = (props: BusArrivalModalProps) => {
    const [visible, setVisible] = useState(false)

    return (
      <>
        <Button
          style={styles.button}
          appearance="outline"
          size="giant"
          status={props.BusStop.Theme}
          onPress={() => setVisible(true)}>
          {props.BusStop.Name}
        </Button>
        <Modal
            visible={visible}
            onBackdropPress={() => setVisible(false)}
            backdropStyle={styles.backdrop}
        >
          <Card style={styles.card}>
            <BusArrivalCard BusStopCode={props.BusStop.Code} />
          </Card>
        </Modal>
      </>
    )
}

const styles = StyleService.create({
  button: {
    margin: 20,
  },
  card: {
    alignItems: 'center'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
})

export default BusArrivalModal
