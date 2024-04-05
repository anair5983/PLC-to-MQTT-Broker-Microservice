# PLC to MQTT Broker Microservice
This repo consists of a microservice that connects to a Beckhoff PLC and publishes to an MQTT Broker

## How to get set up
### Configuration Files:

### config.json (src)
Inside the src folder there should be a config.json file, consult the sample config file (config_sample.json) for more information on what to provide

**Sample File:**
```json
{
    "ads": {
      "localAmsNetId": "localAmsNetId", // enter local ams net id here
      "localAdsPort": ,  // enter local ads port number here
      "targetAmsNetId": "targetAmsNetId", // enter target ams net id here
      "targetAdsPort": , // enter target ads port number here
      "routerAddress": "routerAddress", // enter router address here
      "routerTcpPort":   // enter router tcp port number here
    },  
    "mqtt": {
      "brokerUrl": "mqtt://____", // enter the mqtt broker url here 
      "mqttPort": 1883, // enter the port of the mqtt broker 
      "baseTopic": "" // enter the base topic structure you would like here
    }, 
    "samplingInterval": 2000 // enter the desired sampling interval
  }
```
### mqtt_topic.json (src/configs)
In the src folder go to the configs directory, there should be a mqtt_topic.json file which will be used to define which PLC tags we wish to read from and also allows us to provide the mapping name for the data from that topic to the broker. 

**If there is not a mqtt_topic.json file:** Please refer to the mqtt_topic_sample.json file which outlines the structure that the mqtt_topic.json needs to have.
*Note: In this case you will have to create the mqtt_topic.json and enter your information there, anything done in the sample file is ignored.

**Sample File:**
```json
{
    "PROVIDE_THE_PLC_TAG_HERE": "PROVIDE_A_POTENTIAL_MAPPING_NAME",
    "PROVIDE_THE_ANOTHER_PLC_TAG_HERE": "PROVIDE_ANOTHER_POTENTIAL_MAPPING_NAME"
}
```

Once the tags have been added run the following commands:
```script
npm run build
npm start
```
This will compile then run the project respectively

