# Connectivity Tester

Network diagnostic tool for Industrial Edge Devices.

- [Connectivity Tester](#connectivity-tester)
  - [Description](#description)
    - [Overview](#overview)
    - [General Task](#general-task)
  - [Requirements](#requirements)
    - [Prerequisites](#prerequisites)
    - [Used components](#used-components)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Ping](#ping)
    - [DNS](#dns)
    - [NTP](#ntp)
    - [OPC UA](#opc-ua)
    - [HTTP Request](#http-request)
  - [Documentation](#documentation)
  - [Contribution](#contribution)
  - [License and Legal Information](#license-and-legal-information)
  - [Disclaimer](#disclaimer)
    
## Description

### Overview

To provide additional network diagnostic possibilities on Industrial Edge Devices, an Edge App can be written with a Python backend and a simple Web UI to enable user interaction.

Current feature set:
* Ping
* DNS resolution and reverse lookup
* NTP
* OPC UA browsing
* HTTP requests (GET, POST and PUT)

<img src="docs/graphics/conntest_edge.png" width="50%">

### General Task

This guide shows how to build, install and use an Edge application with a Python-based (Flask) backend and a JavaScript-based (React) frontend. The backend is used to execute network diagnostic tools based on Python packages and expose these internally over an API, which the frontend can call.

## Requirements

### Prerequisites

* Access to an Industrial Edge Management System (IEM)
* Onboarded Industrial Edge Device on IEM
* Industrial Edge App Publisher
* Docker Environment

### Used components

* Industrial Edge Management OS V1.5.2-4
* Industrial Edge Management App V1.10.3
* Industrial Edge Virtual Device V1.11.0-4-a
* Industrial Edge App Publisher V1.6.5
* Docker Engine 20.10.22
* Docker Compose V2.4

## Installation

Please follow the [installation instructions](docs/Installation.md).

## Usage

To use the app, click on the app icon on your Edge Device or go to `https://<IED_IP>/conntest/`. Use the navigation bar on the top of the page to choose a tool and use the provided input dialogs to execute them.

![usage](/docs/graphics/conntest_01.png)

### Ping

Type in the IP address or the domain name of the host you want to ping.

### DNS

Use the top input field to obtain IP address of a domain and the bottom input field to do the reverse.

### NTP

Type in the IP address or the domain name of the NTP server you want to contact.

### OPC UA

Type in the OPC UA connection URL (e.g. `opc.tcp://<IP>:<Port>`). If necessary, type in the username and password for OPC UA authentication as well. Click `Connect` to browse the OPC UA server.

Navigate the tree view using the mouse or keyboard. Selecting a node will show detailed information such as name, address, and value. Once browsed, the connection stays open until you click the `Disconnect` button.

### HTTP Request

Choose the type of HTTP request to send and fill out the headers or body if required. SSL certificate verification is disabled by default. Use the `Copy to Clipboard` button to copy the entire HTTP response.

The `headers` and `body` input fields should contain JSON formatted strings.

Example `headers`:

`{"Content-Type":"application/json"}`

Example `body`:

`{"data":"This is my data"}`

## Documentation

You can find further documentation and help in the following links:

* [Industrial Edge Hub](https://iehub.eu1.edge.siemens.cloud/#/documentation)
* [Industrial Edge Forum](https://www.siemens.com/industrial-edge-forum)
* [Industrial Edge Landing Page](https://new.siemens.com/global/en/products/automation/topic-areas/industrial-edge/simatic-edge.html)
* [Industrial Edge GitHub Page](https://github.com/industrial-edge)

## Contribution

Thank you for your interest in contributing. Anybody is free to report bugs, unclear documentation, and other problems regarding this repository in the Issues section.
Additionally everybody is free to propose any changes to this repository using Pull Requests.

If you haven't previously signed the [Siemens Contributor License Agreement](https://cla-assistant.io/industrial-edge/) (CLA), the system will automatically prompt you to do so when you submit your Pull Request. This can be conveniently done through the CLA Assistant's online platform. Once the CLA is signed, your Pull Request will automatically be cleared and made ready for merging if all other test stages succeed.

## License and Legal Information

Please read the [Legal information](LICENSE.txt).

## Disclaimer

IMPORTANT - PLEASE READ CAREFULLY:

This documentation describes how you can download and set up containers which consist of or contain third-party software. By following this documentation you agree that using such third-party software is done at your own discretion and risk. No advice or information, whether oral or written, obtained by you from us or from this documentation shall create any warranty for the third-party software. Additionally, by following these descriptions or using the contents of this documentation, you agree that you are responsible for complying with all third party licenses applicable to such third-party software. All product names, logos, and brands are property of their respective owners. All third-party company, product and service names used in this documentation are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.
