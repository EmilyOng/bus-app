export enum BusLoad {
    // Seats available
    SEA = "SEA",
    // Standing available
    SDA = "SDA",
    // Limited standing
    LSD = "LSD"
}

export enum VehicleType {
    // Single deck
    SD = "SD",
    // Double deck
    DD = "DD",
    // Bendy
    BD = "BD"
}

export interface NextBus {
    EstimatedArrival: string
    Load: BusLoad
    Type: VehicleType
}

export interface BusService {
    ServiceNo: string
    NextBus: NextBus
    NextBus2: NextBus
    NextBus3: NextBus
}

export interface DisplayBusStop {
    Code: string
    Name: string
    Theme: 'primary' | 'danger' | 'warning' | 'success' | 'info'
}
