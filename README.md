# Discord Status Updater

Hey! This is a simple little side project I'm working on to automatically update my Discord status to show what I'm currently up to. Sometimes Discord's default status features just aren't enough, right? 

## What it does right now
Currently, it uses Node.js and some Javascript magic (discord-rpc and ctive-win to be specific) to check what window I have open. It specifically looks for a few apps like Chrome, Edge, and Apple Music. If I'm using one of those, it updates my Discord status to show the title of the window and what app it is. It checks every 15 seconds!

## How to use it
If you wanna run it yourself:
1. Make sure you have Node.js installed.
2. Run 
pm install in this folder to grab the dependencies.
3. Run 
ode app.js in your terminal.
4. Keep the terminal open and let it do its thing!

## Future Ideas / To-Do List
I've got a lot of ideas for where this could go. Here's what I want to add eventually:
*   **Mix & Match:** It'd be cool to combine apps, like "Playing [game] while listening to [song/video]".
*   **YouTube Specifics:** Showing "Watching [youtuber] : [video title]", and hopefully even knowing if the video is paused!
*   **Emulator Details:** Showing exactly what emulator I'm running and what game I'm playing on it so I can turn off the normal Discord overlay.
*   **Music Details:** "Listening to [Artist] : [Song] on Apple Music".
