const RPC = require('discord-rpc');
const activeWin = require('active-win');

const clientId = '1502113663233032213';
const client = new RPC.Client({ transport: 'ipc' });

let lastTitle = '';

async function updateStatus() {
    try {
        const win = await activeWin();
        if (!win || !win.title || win.title === lastTitle) return;
        lastTitle = win.title;

        const details = win.title.substring(0, 120);

        client.setActivity({
            details,
            instance: false,
            type: 0,
            largeImageKey: 'logo',
        }).then(() => {
            console.log('Success: Sent status to Discord.');
        });

        console.log(`[Status Updated] ${details}`);
    } catch (err) {
        console.error('Error updating status:', err);
    }
}

client.on('ready', () => {
    console.log('--- Status Updater Live ---');
    setInterval(updateStatus, 15000);
    updateStatus();
});

client.login({ clientId }).catch(console.error);
