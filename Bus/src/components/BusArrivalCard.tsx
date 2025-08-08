import { Card, List, Spinner, StyleService, Text } from "@ui-kitten/components";
import { useBusArrivalResponse } from "composables/bus";
import { differenceInMinutes } from "date-fns";
import { BusLoad, BusService } from "models/bus";

interface BusArrivalCardProps {
  BusStopCode: string;
}

const BusArrivalCard = (props: BusArrivalCardProps) => {
  const { loading, busArrivalResponse } = useBusArrivalResponse(
    props.BusStopCode,
  );

  const formatArrivalDuration = (arrivalTime: string) => {
    if (arrivalTime.length === 0) {
      return "-";
    }
    const duration = differenceInMinutes(arrivalTime, Date.now());
    return duration <= 0 ? "要到了" : `${duration} 分钟`;
  };

  const renderItem: ({
    item,
    index,
  }: {
    item: BusService;
    index: number;
  }) => React.ReactElement = ({ item }) => (
    <Card status={item.NextBus.Load === BusLoad.SEA ? "success" : "warning"}>
      <Text category="h1">{item.ServiceNo}</Text>
      <Text category="h5">
        {formatArrivalDuration(item.NextBus.EstimatedArrival)}
      </Text>
      <Text category="h5">
        {formatArrivalDuration(item.NextBus2.EstimatedArrival)}
      </Text>
    </Card>
  );

  if (loading) {
    return <Spinner status="danger" />;
  }

  return (
    <List
      style={styles.container}
      data={busArrivalResponse!.Services}
      renderItem={renderItem}
    />
  );
};

const styles = StyleService.create({
  container: {
    maxHeight: 600,
    minWidth: 300,
  },
});

export default BusArrivalCard;
