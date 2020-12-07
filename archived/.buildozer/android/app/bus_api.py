import requests
from datetime import datetime

headers = {"AccountKey": "r6oXJUS9Rb6xqBxG6x3L6A== ",
           "accept": "application/json"}


def get_time_difference(time):
    # datetime(year, month, day, hour, minute, second, microsecond)
	
    if len(time) <= 0:
        return -1  # Invalid
		
    temp_index = time.find("T")

    # Date
    date = time[:temp_index]
    date = date.split("-")
    date = [int(x) for x in date]

    # Time
    time = time[temp_index+1:time.find("+")]
    time = time.split(":")
    time = [int(x) for x in time]

    datetime_object = datetime(date[0], date[1], date[2],
                               time[0], time[1], time[2])

    # print(datetime_object)
    # print(datetime.now())

    # Return time difference
    curr_time = datetime.now()
    time_difference = (datetime_object-curr_time).seconds//60
    if curr_time > datetime_object:
        return 0  # Arr

    return time_difference


def determine_arr(time_difference):
    if time_difference == 0:
        return "要到了"  # Arr
    elif time_difference == -1:
        return "-"  # Invalid
    else:
        return str(time_difference) + " 分钟"  # Time + min


def get_bus_timings(bus_stop_code):
    # Make API call
    bus_arrival_response = requests.get("http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2",
                                        headers=headers,
                                        params={"BusStopCode": bus_stop_code}).json()

    # Get services
    bus_arrival_response = bus_arrival_response["Services"]
    bus_timings = []
    for bus in bus_arrival_response:
        bus_1 = get_time_difference(bus["NextBus"]["EstimatedArrival"])
        bus_2 = get_time_difference(bus["NextBus2"]["EstimatedArrival"])
        bus_timings.append(
            [bus["ServiceNo"], determine_arr(bus_1), determine_arr(bus_2)])

    return bus_timings
