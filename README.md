## About

An example bot, to show abblities with [@discordjs/core](https://discord.js.org/docs/packages/core/main)

## Intoduction

This repository will show you diffrent usage cases of [@discordjs/core](https://discord.js.org/docs/packages/core/main)

You may ask, why would you need it?
Here are some reasons:
- The package is highly customisable, no caches or other unnesesary things are included
- Accordingly memeory usage is definitely less
- Package uses raw api data, so most of bugs will be eliminated

## Usage

The example doesnt contain too much functions, to allow you imagine how beautiful your feature bot is going to be

## Configuration

Rename [`.env.example`](./.env.example`) to `.env` and fill it with all of your important data

Then you can deploy them by using `npm run deploy`

Meanwhile [`interactions`](./src/interactions/) are splited into:
- [`commands`](./src/interactions/commands/): slash commands and context menus
- [`components`](./src/interactions/components/): buttons and select menus
- [`autocompletes`](./src/interactions/autocompletes/)
- [`modals`](./src/interactions/modals/)

Have a good fun making your bot! 🎉

## Contrubuting

Owner of the repository is [Jaw0r3k](https://discord.com/users/693055800322818149)

Fell free to improve the repository by opening an issue or creating a pull request
