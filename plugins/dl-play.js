import yts from 'yt-search';

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `✳️ Example: *${usedPrefix + command}* Lil Peep hate my life`;
    
    try {
        let res = await yts(text);
        let vid = res.videos[0];
        
        if (!vid) throw `✳️ Video/Audio not found`;

        let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid;
        m.react('🎧');

        let play = `
≡ *ULTRA-MD MUSIC*
┌──────────────
▢ 📌 *Title:* ${title}
▢ 📆 *Uploaded:* ${ago}
▢ ⌚ *Duration:* ${timestamp}
▢ 👀 *Views:* ${views.toLocaleString()}
└──────────────`;

        await conn.sendButton(m.chat, play, null, null, [
            ['🎶 MP3', `${usedPrefix}ytmp3 ${url}`],
            ['🎥 MP4', `${usedPrefix}ytmp4 ${url}`]
        ], m, { mentions: [m.sender] });

    } catch (error) {
        console.error('Error in handler:', error);
        // You can choose to notify the user if necessary
        throw 'An error occurred while processing your request.';
    }
};

handler.help = ['play'];
handler.tags = ['dl'];
handler.command = ['play', 'playvid'];
handler.disabled = false;

export default handler;
