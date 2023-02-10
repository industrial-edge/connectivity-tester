# Installation

- [Installation](#installation)
  - [Build application](#build-application)
    - [Cloning image](#cloning-image)
    - [Build docker image](#build-docker-image)
  - [Upload  App to the Industrial Edge Management](#upload--app-to-the-industrial-edge-management)
    - [Connect your Industrial Edge App Publisher](#connect-your-industrial-edge-app-publisher)
    - [Upload  App using the Industrial Edge App Publisher](#upload--app-using-the-industrial-edge-app-publisher)
  - [Deploying of App](#deploying-of-app)
    - [Add additional installation steps here, if required](#add-additional-installation-steps-here-if-required)
      - [Additional steps](#additional-steps)
  
## Build application

### Cloning image

- Clone or Download the source code to your engineering VM

### Build docker image

Add instruction how to build your application, e.g.:

- Open console in the source code folder
- Use command `docker-compose build` to create the docker image.
- This docker image can now be used to build you app with the Industrial Edge App Publisher
- *docker images | grep scannerapp* can be used to check for the images
- You should get a result similar to this:

## Upload  App to the Industrial Edge Management

Please find below a short description how to publish your application in your IEM.

For more detailed information please see the section for [uploading apps to the IEM](https://github.com/industrial-edge/upload-app-to-iem).

### Connect your Industrial Edge App Publisher

- Connect your Industrial Edge App Publisher to your docker engine
- Connect your Industrial Edge App Publisher to your Industrial Edge Management System

### Upload  App using the Industrial Edge App Publisher

- Create a new application using the Industrial Publisher
- Add a app new version
- Import the [docker-compose](../docker-compose.yml) file using the **Import YAML** button
- The warning `Build (services >> scanner-service) is not supported` can be ignored
- **Start Upload** to transfer the app to Industrial Edge Management
- Further information about using the Industrial Edge App Publisher can be found in the [IE Hub](https://iehub.eu1.edge.siemens.cloud/documents/appPublisher/en/start.html)

## Deploying of App


### Add additional installation steps here, if required

#### Additional steps

Add description here
