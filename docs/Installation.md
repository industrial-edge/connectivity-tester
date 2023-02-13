# Installation

- [Installation](#installation)
  - [Build application](#build-application)
    - [Cloning image](#cloning-image)
    - [Build docker image](#build-docker-image)
  - [Upload  App to the Industrial Edge Management](#upload--app-to-the-industrial-edge-management)
    - [Connect your Industrial Edge App Publisher](#connect-your-industrial-edge-app-publisher)
    - [Upload  App using the Industrial Edge App Publisher](#upload--app-using-the-industrial-edge-app-publisher)
  
## Build application

### Cloning image

- Clone or Download the source code to your engineering VM

### Build docker image

- Find the two files (in `src/backend_flask` and `src/frontend_react` respectively) named `Dockerfile.example` and rename them both to `Dockerfile`
- Open console in the root folder (where the docker-compose file is)
- Use command `docker-compose build` to create the docker images
- These docker images can now be used to build you app with the Industrial Edge App Publisher
- `docker images | grep conntest` can be used to check for the images

## Upload  App to the Industrial Edge Management

Please find below a short description how to publish your application in your IEM. For more detailed information, please see the section for [uploading apps to the IEM](https://github.com/industrial-edge/upload-app-to-iem).

### Connect your Industrial Edge App Publisher

- Connect your Industrial Edge App Publisher to your docker engine
- Connect your Industrial Edge App Publisher to your Industrial Edge Management System

### Upload  App using the Industrial Edge App Publisher

- Create a new application using the Industrial Edge App Publisher
- You may use the provided [icon](/docs/graphics/conntest_edge.png)
- Add a new app version
- Import the [docker-compose](../docker-compose.yml) file using the **Import YAML** button
- The warning `Build (services >> scanner-service) is not supported` can be ignored
- Next to the conntest_frontend service, go to `Edit`:
![02](/docs/graphics/conntest_02.png)
- Go to `Network` and remove the predefined port mapping:
![03](/docs/graphics/conntest_03.png)
- Still under `Network`, set up the reverse proxy in the following way and add the configuration with the plus on the bottom right:
![04](/docs/graphics/conntest_04.png)
- Proceed with the app version creation and make sure that the following settings are set up correctly:
![05](/docs/graphics/conntest_05.png)
- **Start Upload** to transfer the app to Industrial Edge Management
- Further information about using the Industrial Edge App Publisher can be found in the [IE Documentation](https://docs.eu1.edge.siemens.cloud/operator/index.html)
- Install the app on an Edge Device and follow the usage instructions on the main page of this guide