export enum BusLoad {
    // Seats available
    SEA = 1,
    // Standing available
    SDA = 2,
    // Limited standing
    LSD = 3
}

export enum VehicleType {
    // Single deck
    SD = 1,
    // Double deck
    DD = 2,
    // Bendy
    BD = 3
}

export interface NextBus {
    EstimatedArrival: Date
    Load: BusLoad
    Type: VehicleType
}

export interface BusService {
    ServiceNo: string
    NextBus: NextBus
    NextBus2: NextBus
    NextBus3: NextBus
}
