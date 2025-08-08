import { BusAPI, BusArrivalRequest, BusArrivalResponse } from "api/bus";
import { useEffect, useState } from "react";

export function useBusArrivalResponse(busStopCode: string) {
  const busAPI = new BusAPI();
  const busArrivalRequest: BusArrivalRequest = {
    BusStopCode: busStopCode,
  };

  const [loading, setLoading] = useState(true);
  const [busArrivalResponse, setBusArrivalResponse] =
    useState<BusArrivalResponse>();

  useEffect(() => {
    setLoading(true);
    setBusArrivalResponse(undefined);

    busAPI
      .getBusArrival(busArrivalRequest)
      .then((busArrivalResponse) => {
        setBusArrivalResponse(busArrivalResponse);
      })
      .finally(() => setLoading(false));

    return () => {
      setLoading(false);
      setBusArrivalResponse(undefined);
    };
  }, []);

  return { loading, busArrivalResponse };
}
