import { Button, Card, Layout, Modal, StyleService } from "@ui-kitten/components";
import { useState } from "react";
import BusArrivalCard from "./BusArrivalCard";

interface BusArrivalModalProps {
    BusStopCode: string
}

const BusArrivalModal = (props: BusArrivalModalProps) => {
    const [visible, setVisible] = useState(false)

    return (
      <Layout style={styles.container} level="1">
        <Button
          style={styles.button}
          appearance="outline"
          size="giant"
          onPress={() => setVisible(true)}>
          {props.BusStopCode}
        </Button>
        <Modal
            visible={visible}
            onBackdropPress={() => setVisible(false)}
            backdropStyle={styles.backdrop}
        >
          <Card style={styles.card}>
            <BusArrivalCard BusStopCode={props.BusStopCode} />
          </Card>
        </Modal>
      </Layout>
    )
}

const styles = StyleService.create({
  button: {
    margin: 20,
  },
  container: {
    maxHeight: 600,
    minWidth: 300,
  },
  card: {
    alignItems: 'center'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
})

export default BusArrivalModal
