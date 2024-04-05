# PLC to MQTT Broker Microservice
This repo consists of a microservice that connects to a Beckhoff PLC and publishes to an MQTT Broker

## How to get set up
In the src folder go to the configs directory, there will be a mqtt_topic.json file which will be used to define which PLC tags we wish to read from and also allows us to provide the mapping name for the data from that topic to the broker.

Once the tags have been added run the following commands:
```script
npm run build
npm start
```
This will compile then run the project respectively
