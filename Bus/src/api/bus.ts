import { BusService } from 'models/bus'

export interface BusArrivalRequest {
    BusStopCode: string
}

export interface BusArrivalResponse {
    BusStopCode: string
    Services: BusService[]
}

export class BusAPI {
    private static readonly BUS_ARRIVAL_URL: string = 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival'
    private apiKey: string

    constructor() {
        const { API_KEY } = process.env
        if (!API_KEY) {
            throw new Error('Expected API_KEY but not set.')
        }

        this.apiKey = API_KEY
    }

    public async getBusArrival(busArrivalRequest: BusArrivalRequest): Promise<BusArrivalResponse> {
        const busArrivalRequestUrl = `${BusAPI.BUS_ARRIVAL_URL}?BusStopCode=${busArrivalRequest.BusStopCode}`

        return fetch(busArrivalRequestUrl, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                AccountKey: this.apiKey,
            }
        })
            .then(res => res.json())
    }
}
