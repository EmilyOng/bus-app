import { BusAPI, BusArrivalRequest, BusArrivalResponse } from "api/bus";
import { PRIORITY_BUS_SERVICES } from "data";
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
        busArrivalResponse.Services.sort((busService1, busService2) => {
          if (PRIORITY_BUS_SERVICES.includes(busService1.ServiceNo)) {
            return -1;
          }
          if (PRIORITY_BUS_SERVICES.includes(busService2.ServiceNo)) {
            return 1;
          }
          
          if (busService1.ServiceNo < busService2.ServiceNo) {
            return -1;
          } else if (busService1.ServiceNo == busService2.ServiceNo) {
            return 0;
          } else {
            return 1;
          }
        })
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
