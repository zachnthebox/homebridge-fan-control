# homebridge-fan-control

An API key for the google assistant api is required.
You will need to create a new project [here](https://console.cloud.google.com/)

From there, you will be able to download a json file with your key.
https://console.cloud.google.com/apis/credentials
    
- Create a "OAuth client ID"
- Choose "other" as the type
- Download the API Key as json
- Save this file as `api_key.json`

After you have the key, you will need to login and get a token response.
Save the response json as `tokens.json`.


Install [Homebridge](https://github.com/homebridge/homebridge)
```sh
sudo npm install -g --unsafe-perm homebridge
```

Install the [homebridge-http-switch](https://github.com/Supereg/homebridge-http-switch) Plugin

```sh
sudo npm install -g homebridge-http-switch
```

Use the config below for homebridge located at `~/.homebridge/config.json`

```json
{
    "bridge": {
        "name": "Homebridge",
        "username": "CC:22:3D:E3:CE:30",
        "port": 51826,
        "pin": "031-45-154"
    },

    "description": "Homebridge configuration for controlling a non-homekit enabled accessory",

    "accessories": [
        {
          "accessory": "HTTP-SWITCH",
          "name": "Fan",
          "switchType": "toggle",
          "onUrl": "http://localhost:4444/api/fan/living-room/actions/turnOn",
          "offUrl": "http://localhost:4444/api/fan/living-room/actions/turnOff"
        }
    ]
}
```
