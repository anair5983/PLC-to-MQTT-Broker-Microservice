# PLC to MQTT Broker Microservice
This repo consists of a microservice that connects to a Beckhoff PLC and publishes to an MQTT Broker

## How to get set up
### Configuration Files:

### config.json (src)
Inside the src folder there should be a config.json file, consult the sample config file (config_sample.json) for more information on what to provide
### mqtt_topic.json (src/configs)
In the src folder go to the configs directory, there should be a mqtt_topic.json file which will be used to define which PLC tags we wish to read from and also allows us to provide the mapping name for the data from that topic to the broker. 

**If there is not a mqtt_topic.json file:** Please refer to the mqtt_topic_sample.json file which outlines the structure that the mqtt_topic.json needs to have.
*Note: In this case you will have to create the mqtt_topic.json and enter your information there, anything done in the sample file is ignored.

Once the tags have been added run the following commands:
```script
npm run build
npm start
```
This will compile then run the project respectively

