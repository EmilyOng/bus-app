import requests

headers = {"AccountKey": "r6oXJUS9Rb6xqBxG6x3L6A== ",
           "accept": "application/json"}

def get_bus_timings ():
    # Make API call
    bus_arrival_response = requests.get("http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2", headers=headers, params={"BusStopCode": "83139"}).json()
    print(bus_arrival_response)