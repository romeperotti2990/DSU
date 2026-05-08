const RPC = require('discord-rpc');
const activeWin = require('active-win');

// Replace with your Application ID from the Developer Portal
const clientId = '1502113663233032213'; 
const client = new RPC.Client({ transport: 'ipc' });

// We store the last title to avoid spamming Discord with the same update
let lastTitle = '';

async function updateStatus() {
    try {
        const win = await activeWin();
        if (!win || win.title === lastTitle) return;
        lastTitle = win.title;

        let details = win.title;
        let state = `on ${win.owner.name.split('.')[0]}`;
        let activityType = 0; // Default to 'Playing'

        // UNIQUE DIALOGUE: YouTube Parsing
        if (win.title.includes(' - YouTube')) {
            const cleanTitle = win.title.replace(' - YouTube', '');
            const parts = cleanTitle.split(' - ');
            if (parts.length > 1) {
                const channel = parts.pop();
                const videoTitle = parts.join(' - ');
                details = videoTitle;
                state = `Watching ${channel}`;
            } else {
                details = cleanTitle;
                state = "Watching YouTube";
            }
            activityType = 3; // Change header to 'Watching'
        } 
        
        // UNIQUE DIALOGUE: Apple Music Parsing
        else if (win.owner.name.includes('Music')) {
            if (win.title.includes(' — ')) {
                const [song, artist] = win.title.split(' — ');
                details = song;
                state = `Listening to ${artist}`;
            }
            activityType = 2; // Change header to 'Listening to'
        }

        // Push the update to Discord
        client.setActivity({
            details: details.substring(0, 120),
            state: state.substring(0, 120),
            startTimestamp: Date.now(), // Adds the 'elapsed' timer
            instance: false,
            type: activityType
        }).then(() => console.log(`[Presence] Updated: ${state} : ${details}`))
          .catch(console.error);

    } catch (err) {
        // Silently fail if window info can't be fetched (happens during transitions)
    }
}

client.on('ready', () => {
    console.log('--- MEEPUG MEDIA TRACKER LIVE ---');
    console.log('Ensure "Activity Privacy" is ON in Discord settings.');
    
    // Check every 15 seconds (Discord's hard rate limit)
    setInterval(updateStatus, 15000);
    updateStatus(); 
});

client.login({ clientId }).catch(err => {
    console.error("COULD NOT CONNECT: Is Discord Desktop open?");
});
