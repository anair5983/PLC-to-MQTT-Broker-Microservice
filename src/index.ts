/*
 * index.ts
 *
 * This is the microservice that will extract data from the Beckhoff PLC controller using
 * Beckhoff ADSClient library
 *
 * This code is adapted from samples provided by IoT Academy instructor Prashanta Shrestha with
 * custom classes built to simplify access to ADSClient, MQTTClient and file reading operations
 */


// import what we need to support our solution

import { ADSClient } from './class/ADSClient';
import {IMQTTPayload } from 'interface/IMQTTPayload';
import { MQTTClient } from './class/MQTTClient';
import * as fs from 'fs';
import { IConfiguraton } from 'interface/IConfiguration';

type PLCTopics = { 
	[key: string]: string 
}

async function processReadRequest(client: ADSClient): Promise<void> {
	await client.readVariables();
}

async function processPayload(variable: string, payload: IMQTTPayload, client: MQTTClient, topicJson: PLCTopics): Promise<void> {
	let test = variable.split('.').length - 1
	console.log(`variable: ${variable}`);
	console.log(`payload: ${JSON.stringify(payload)}`);
	client.publish(topicJson[variable], payload);
}

const shutdown = async (adsClient: ADSClient, mqttClient: MQTTClient) => {
	await adsClient.shutdown();
	await mqttClient.shutdown();
	process.exit()
}

/*
 * function main()
 *
 * This function (configured as asynchronous) will test a connection,
 * a read and a shutdown of the connection via the Beckhoff ADS protocol
 */

async function main(){
	const config: IConfiguraton = JSON.parse(fs.readFileSync('./src/config.json', 'utf-8'))
	const topicJson: PLCTopics = JSON.parse(fs.readFileSync('./src/configs/mqtt_topic.json','utf-8'))
	const tags = Object.keys(topicJson)
	const adsclient = new ADSClient(config.ads, tags);
	const mqttClient = new MQTTClient(config.mqtt) 
	process.on("SIGINT", async () => await shutdown(adsclient, mqttClient));
	process.on("SIGTERM", async () => await shutdown(adsclient, mqttClient));
	console.log("starting our one and done request to ADS");
	if (await adsclient.connect()) {
		if(await mqttClient.connect()){
			adsclient.onVariableRead(async (variable, payload) => {
				processPayload(variable, payload, mqttClient, topicJson);
			});
			setInterval(async () => await processReadRequest(adsclient), config.samplingInterval);
		}
	}
	console.log("success!");
}


// invoke main()

main();