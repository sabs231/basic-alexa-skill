# basic-alexa-skill
Boilerplate code to create an basic Amazon Alexa skill

This is a basic skill where you can order a taco

## Requirements

- Node <= 6.1
- ngrok (`npm install -g ngrok`)
- (optional) nodemon

## Installing instructions

- `npm install`

## Execution

- `nodemon server.js`
- `ngrok http 4001`

## Using AWS lambda

- On AWS portal create an empty lambda function
- Make sure you are on `us-east-1` (N. Virgina) region
- Add the `Alexa skills kit` trigger
- `./build.sh`
- Upload your the generated zip `dist/taco.zip` to the lambda function
- Add the `ARN` on the configuration of your skill in the [developer portal](developer.amazon.com)
- Profit
