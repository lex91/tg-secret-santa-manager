# tg-secret-santa-manager

This is telegram bot for `secret Santa` game

## How to setup

1. Create your bot using [@botfather](https://telegram.me/botfather)
2. Set environment variables (create `.env` file in project root or use hosting provider's settings) See `.env.example` for reference
3. Deploy this project somewhere (find hosting or do it locally)

## How to use

1. Set bot owner. To do this, write in private chat (Only! Or you want to share your password with others?) with bot: ```/own password=<owner password from .env>```

2. Add bot to group with your friends and start game: ```/init <password for game (not owner's password!)>```

3. Now you and your friends can register for game, Follow bot instructions

4. Any user can do `/list` command to see current participants

5. When everyone registered, bot owner (who executed /own command) can start draw process using `/run` command. Bot will pick random pairs from participants, everyone will get PM with person whom you should make gift

## TODO

* Use DB instead of in-memory data storing
* Support multiple games at the same time
* Allow users to customize their names in list
