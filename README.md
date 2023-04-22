# Crossmint Megaverse

## Getting started

There are a few things that you need in order to setup the project:

### Pre-requisites

- **[NVM](https://github.com/nvm-sh/nvm)** (not mandatory, nvm allows you to quickly install and use different versions of node via the command line)

* If you aren't using NVM, be sure to have a version of Node higher than +12.

After we've got the above installed, you should follow a few steps:

Clone this repository 

```
git clone https://github.com/tszemzo/crossmint-megaverse.git
```

`cd` in to created directory

```
cd crossmint-megaverse
```

Create the .env file and install all the modules with the following command:
```
cp .env.sample .env && npm install
```

Run the server and both functions will start running (createPolyanetCross & createLogo)
```
npm start
```

## Additional comments

A few improvals that may be added in the future (there might be more...):
- Testing
- More validation
- Better and customizable Error / Error messages
