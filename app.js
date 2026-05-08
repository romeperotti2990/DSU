const RPC = require('discord-rpc');
const activeWin = require('active-win');

const clientId = '1502113663233032213'; 
const client = new RPC.Client({ transport: 'ipc' });

async function updateStatus() {
    try {
        const win = await activeWin();
        
        if (win) {
            // Log to terminal so you can see it working
            console.log(`Current Window: ${win.title} (${win.owner.name})`);

            // This filters so it only updates for browsers or music
            const apps = ['chrome.exe', 'msedge.exe', 'Music.exe', 'AppleMusic.exe', 'ApplicationFrameHost.exe'];
            
            if (apps.includes(win.owner.name)) {
                client.setActivity({
                    details: win.title.substring(0, 120),
                    state: `on ${win.owner.name.split('.')[0]}`,
                    instance: false,
                });
            }
        }
    } catch (err) {
        console.error("Error getting window info:", err);
    }
}

client.on('ready', () => {
    console.log('Discord RPC Connected! Play something in Chrome or Apple Music.');
    // Check every 15 seconds
    setInterval(updateStatus, 15000);
    updateStatus(); // Run once immediately on start
});

client.login({ clientId }).catch(console.error);


