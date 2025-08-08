import { BusAPI, BusArrivalRequest } from "api/bus"

describe('getBusArrival', () => {
  test('works', async () => {
    const busAPI = new BusAPI()

    const busArrivalRequest: BusArrivalRequest = {
      BusStopCode: '84479'
    }
    const busArrivalResponse = await busAPI.getBusArrival(busArrivalRequest)
    expect(busArrivalResponse.BusStopCode).toEqual('84479')
    expect(busArrivalResponse.Services).toHaveLength(5)
  })
})
