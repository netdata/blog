---
slug: airquality 
title: "Monitor indoor air quality with Airthings and Netdata"
description: "Monitor indoor air quality with Airthings and Netdata"
tags: [airthings,airquality,indoor,netdata,co2,humidity,temperature,radon,pm1,pm25,voc,pressure]
keywords: [airthings,airquality,indoor,netdata,co2,humidity,temperature,monitoring,how-to]
authors: shyam
---

Monitoring indoor air quality with [Airthings](https://www.airthings.com/) and Netdata.

<!--truncate-->

## Indoor air quality and what to monitor

Indoor air quality can be a crucial influence on your health, wellbeing and productivity. 

Understanding and measuring common contaminants and pollutants is the first step towards reducing your risk of air quality health concerns. 

Airthings is a company that makes great air quality sensors that measure a wide variety of different variables including: 
- **CO2**
  - Increased Carbon Dioxide levels can ­cause low productivity and infectious disease transmission.
- **Humidity**
  - Too much or too little humidity can affect allergies, asthma and cold or flu symptoms.
- **Temperature**
  - Indoor temperatures can affect sleep quality as well as performance and mood.
- **Radon**
  - An odorless, radioactive gas that can cause cancer with prolonged unmitigated exposure.
- **Pressure**
  - Air pressure levels can be a good indicator of whether the ventilation system is working optimally or not.
- **Particulate Matter (PM1, PM2.5)** 
  - A mixture of dust, dirt, and liquids that become suspended in the air.
- **VOC** 
  - Airborne chemicals and odors emitted from many everyday products, including cleaners, paints and furniture, cosmetics, hobby products, cooking etc.

While Airthings comes with a mobile app - monitoring air quality metrics with Netdata offers some advantages such as being able to monitor it along with other relevant metrics, in-built anomaly detection and alerts. If you have multiple sensors, Netdata is a great option for a composite view. Let's take a look at how to monitor Airthings air quality metrics using Netdata.

## Collecting sensor data

As a pre-requisite you will need:
- an Airthings device such as the Airthings View Plus which is used in this example. 
- a Netdata cloud account
- a system running the Netdata agent (and will need to run the Python collection script)  

1. To start off you will need the API token and client id which can be created at https://dashboard.airthings.com/integrations/api-integration with the scopes ‘'’read:device:current_values’’’ checked.

2. Export the secret key as an environment variable:

```
 export secret="secret-key"
```

3. Run [this python script](https://github.com/netdata/community/blob/main/utilities/airthings_collector.py) (after updating client_id and device_id variables from the Airthings website) as a cronjob piping the results to a csv file. For example if you want to schedule the python script to run once every minute, add the following line to cron.

```
* * * * * <PATH_TO_PYTHON> <PYTHON_SCRIPT> <PATH_TO_CSV>
``` 


4. We'll be using Netdata's new [pandas collector](https://learn.netdata.cloud/docs/agent/collectors/python.d.plugin/pandas) to collect data from this CSV file (the same technique can be used to collect data from any CSV file and auto create powerful composite charts and dashboards). 

Update the pandas conf file with the below information, replace the PATH_TO_CSV variable with the path where your csv file from step 3 is located.

```
airthings:
    name: "airthings"
    update_every: 5
    chart_configs:
       - name: "CO2"
         title: "CO2"
         family: "airthings.co2"
         context: "airthings.co2"
         type: "area"
         units: "ppm"
         df_steps: >
           pd.read_csv('PATH_TO_CSV', usecols = ['co2']);
           df.mean().to_frame().transpose();
        - name: "Humidity"
         title: "Humidity"
         family: "airthings.humidity"
         context: "airthings.humidity"
         type: "line"
         units: "%"
         df_steps: >
           pd.read_csv('PATH_TO_CSV', usecols = ['humidity']);
           df.mean().to_frame().transpose();
       - name: "Indoor_Temperature"
         title: "Indoor Temperature"
         family: "airthings.temperature"
         context: "airthings.temperature"
         type: "line"
         units: "celsius"
         df_steps: >
           pd.read_csv('PATH_TO_CSV', usecols = ['temp']);
           df.mean().to_frame().transpose();
       - name: "Air_Pressure"
         title: "Air Pressure"
         family: "airthings.pressure"
         context: "airthings.pressure"
         type: "line"
         units: "hPa"
         df_steps: >
           pd.read_csv('PATH_TO_CSV', usecols = ['pressure']);
           df.mean().to_frame().transpose();
       - name: "Radon"
         title: "Radon"
         family: "airthings.radon"
         context: "airthings.radon"
         type: "area"
         units: "Bq/m^3"
         df_steps: >
           pd.read_csv('PATH_TO_CSV', usecols = ['radon']);
           df.mean().to_frame().transpose();
       - name: "PM2.5"
         title: "PM2.5"
         family: "airthings.pm25"
         context: "airthings.pm25"
         type: "area"
         units: "micrograms/m^3"
         df_steps: >
           pd.read_csv('PATH_TO_CSV', usecols = ['pm25']);
           df.mean().to_frame().transpose();
       - name: "PM1"
         title: "PM1"
         family: "airthings.pm1"
         context: "airthings.pm1"
         type: "area"
         units: "micrograms/m^3"
         df_steps: >
           pd.read_csv('PATH_TO_CSV', usecols = ['pm1']);
           df.mean().to_frame().transpose();
       - name: "VOC"
         title: "VOC"
         family: "airthings.voc"
         context: "airthings.voc"
         type: "line"
         units: "ppb"
         df_steps: >
           pd.read_csv('PATH_TO_CSV', usecols = ['voc']);
           df.mean().to_frame().transpose();
 ```

5. [Restart the Netdata agent](https://learn.netdata.cloud/docs/configure/start-stop-restart)

## Netdata + Airthings

Airthings metrics should now be visible in the Netdata UI.  

![image](https://user-images.githubusercontent.com/24860547/199477710-ff6ecaf7-521f-4345-ab49-86fab5ffd087.png)

Each metric is presented on a separate time-series chart.

![image](https://user-images.githubusercontent.com/24860547/199477936-d89f6601-ed62-4167-a7aa-239f6c44ceea.png)

If you have multiple sensors, these charts will composite the information from all of the sensors with the option to filter the ones you want to explore further. 

![image](https://user-images.githubusercontent.com/24860547/199477994-c4250231-a4aa-487e-a566-9c1a7b1466f2.png)

Netdata comes with in-built unsupervised ML for [anomaly detection](https://learn.netdata.cloud/guides/monitor/anomaly-detection), and each metric has an anomaly rate associated with it. This means that if the temperature or pressure or radon or any of these metrics starts behaving anomalously you can quickly spot it using Netdata.

![image](https://user-images.githubusercontent.com/24860547/199478174-31413dd3-680e-4e4e-8aba-8e64cf2a8366.png)
![image](https://user-images.githubusercontent.com/24860547/199478271-483e0699-94f5-4336-813a-431e0acab673.png)
![image](https://user-images.githubusercontent.com/24860547/199478326-13e59b9b-3945-4dca-be2e-dbbf3cff3b04.png)

If you have other smart devices and sensors and are monitoring those with Netdata as well then it is very likely that metric correlation will point you towards the likely cause or trigger for a particular spike or dip that you see in these metrics. 

![image](https://user-images.githubusercontent.com/24860547/199478408-4f2f6783-f326-4fa9-bcba-f663ad72632c.png)
![image](https://user-images.githubusercontent.com/24860547/199478477-e41cb3a2-c367-4379-ace4-6d3596bbfd9c.png)
![image](https://user-images.githubusercontent.com/24860547/199478518-4a594a7d-11d7-4081-935f-9a1423249d6c.png)


## Let us hear from you

If you haven’t already, [sign up now for a free Netdata account!](https://app.netdata.cloud/) 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
