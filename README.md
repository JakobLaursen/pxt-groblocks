# pxt-Groblocks

GroBot sensors and actuators
Sensor	Interval	Meaning
Humidity	0 – 100 % RH	Sensor
The humidity data of the GroBot chamber is captured with the DHT-22 sensor, which has a range of 0 - 100% RH (relative humidity), accuracy of +-2% RH and a resolution of 0.1% RH.

Representation
The humidity is expressed as relative humidity (RH). Relative humidity, expressed as a percentage, indicates a present state of absolute humidity relative to a maximum humidity given the same temperature.

CO2	0 – 5000 ppm	Sensor
The CO2 data of the GroBot chamber is captured with the MH-Z16 sensor, which has a range of 0 – 5000 ppm (parts per million), accuracy of +-100 ppm and a resolution of 1 ppm.

Representation
The CO2 is expressed as parts per million (ppm). Parts per million expresses how many molecules out of a million air molecules is CO2.

Temperature	-40° - 80°	Sensor
The temperature data of the GroBot chamber is captured with the DHT-22 sensor, which has a range of –40 - 80° (relative humidity), accuracy of +-0.5° and a resolution of 0.1°.

Representation
The temperature is expressed is celsius.

Water Temperature	N/A	Not implemented

Water level	0 – 100 %	Sensor
The water level data of the GroBot reservoir is captured with the a cpacitive waler level sensor, which has a range of 0- 100 %.

Representation
The water level is expressed as ppercentage of how much the reservoir is filled.

IsMicroBit	0 - 1	Is the MicroBit connected (1) or not (0)

MicroBit Button A	0 - 1	Is button A on the MicroBit pressed (1) or not (0)

MicroBit Button B	0 - 1	Is button B on the MicroBit pressed (1) or not (0)

Clock	0000 - 2400	The current timestamp is repressented in the 24 hour format without delimitors, e.g. 22:15 would be respresented as 2215 and 14:45 would be represented af 14:45.

Camera	N/A	Color photo from above every 8 hours



Actuator	Interval	Meaning & how to control
Air circulation	0 – 1	The air circulation is facilitated by to fans inside the grow chamber. The fans are cannot be speed controlled, so the fans are either set to inactive (0) or active (1).
Example of use in MakeCode:
 


Full spectrum grow light	0 – 100 %	The full spectrum grow light can be controlled from 0% to 100% intensity. The full spectrum grow light can deliver a maximum of 100W, e.g. 75% intensity would deliver 75W fll spectrum grow light, while 45% intensity would deliver 45W full spectrum grow light.
Example of use in MakeCode:
 

IR grow light	0 – 100 %	The infrared grow light can be controlled from 0% to 100% intensity. The infrared grow light can deliver a maximum of 40W, e.g. 75% intensity would deliver 30W infrared grow light, while 45% intensity would deliver 18W infrared grow light.
Example of use in MakeCode:
 

UV grow light	0 – 100 %	The ultraviolet grow light can be controlled from 0% to 100% intensity. The ultraviolet grow light can deliver a maximum of 40W, e.g. 75% intensity would deliver 30W ultraviolet grow light, while 45% intensity would deliver 18W ultraviolet grow light.
Example of use in MakeCode:
 

Water pump burst	0 – 100 ml	Water pump can be controlled via two functions; the first function is able to supply a single burst of water (ml) to the reservoir, and the other function is able to supply a constant flow of water (ml/h) to the reservoir.
The first function is the water pump burst. It supplies a single burst of water from 0 ml to 100 ml to the reservoir, whenever the function is called. E.g. a function call of 75 will deliver a single burst of 75 ml water to the reservoir once, and a function call of 45 will deliver a single burst of 45 ml water to the reservoir once.
Example of use in MakeCode:
 

Water pump flow	0 – 100 ml/h
	The other function is the water pump flow. Is supplies a flow of water over a time period (ml/h) and will only stop if another value for water pump flow is called. E.g. a function call of 75 will supply 75 ml of water to the reservoir every hour, and a function call of 45 will supply 45 ml of water to the reservoir ever hour
Example of use in MakeCode:

 

Fertilizer pump burst	0 – 100 ml

	Fertilizer pump can be controlled via two functions; the first function is able to supply a single burst of fertilizer (ml) to the reservoir, and the other function is able to supply a constant flow of fertilizer (ml/h) to the reservoir.
The first function is the fertilizer pump burst. It supplies a single burst of fertilizer from 0 ml to 100 ml to the reservoir, whenever the function is called. E.g. a function call of 75 will deliver a single burst of 75 ml fertilizer to the reservoir once, and a function call of 45 will deliver a single burst of 45 ml fertilizer to the reservoir once.
Example of use in MakeCode:

 

Fertilizer pump flow 	0 – 100 ml/h	The other function is the fertilizer pump flow. Is supplies a flow of water over a time period (ml/h) and will only stop if another value for fertilizer pump flow is called. E.g. a function call of 75 will supply 75 ml of fertilizer to the reservoir every hour, and a function call of 45 will supply 45 ml of fertilizer to the reservoir ever hour
Example of use in MakeCode:
 

Air change burst	0 – 100 ml	Air change can be controlled via two functions; the first function is able to supply a single burst of air (ml) to the grow chamber, and the other function is able to supply a constant flow of air (ml/h) to the grow chamber.
The first function is the air change burst. It supplies a single burst of air from 0 ml to 100 ml to the grow chamber, whenever the function is called. E.g. a function call of 75 will deliver a single burst of 75 ml air to the grow chamber once, and a function call of 45 will deliver a single burst of 45 ml air to the grow chamber once.
Example of use in MakeCode:
 

Air change flow	0 – 100 ml/h	The other function is the air change flow. Is supplies a flow of air over a time period (ml/h) and will only stop if another value for air change flow is called. E.g. a function call of 75 will supply 75 ml of air to the grow chamber every hour, and a function call of 45 will supply 45 ml of air to the grow chamber ever hour.
Example of use in MakeCode:


Water aeration burst	0 – 100 ml	Water aeration can be controlled via two functions; the first function is able to supply a single burst of air (ml) to the reservoir, and the other function is able to supply a constant flow of air (ml/h) to the reservoir.
The first function is the water aeration burst. It supplies a single burst of air from 0 ml to 100 ml to the reservoir, whenever the function is called. E.g. a function call of 75 will deliver a single burst of 75 ml air to the reservoir once, and a function call of 45 will deliver a single burst of 45 ml air to the reservoir once.
Example of use in MakeCode:
 

Water aeration flow	0 – 100 ml/h	The other function is the water aeration flow. Is supplies a flow of air over a time period (ml/h), and will only stop if another value for water aeration flow is called. E.g. a function call of 75 will supply 75 ml of air to the reservoir every hour, and a function call of 45 will supply 45 ml of air to the reservoir ever hour
Example of use in MakeCode:
 

Heater	0 – 40 °	The heater able to heat up the grow chamber to a desired temperature. The heater has a range of 0 –40° and the function will only be activated if the desired temperature is higher than the current temperature in the grow chamber. If the temperature exceeds 40° the heater will be deactivated as a security precaution.

The internal fans and the heater will run alternately under heating, in order to get a stable and even heat distribution in the grow chamber.

Example of use in MakeCode: 
 





