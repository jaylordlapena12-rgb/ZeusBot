const fs = require('fs-extra');
const path = require('path');

module.exports = {
    name: "owner",
    version: "1.1.0",
    author: "Hridoy + Edited by ChatGPT",
    description: "Auto reply with bot owner's information if someone types 'owner'.",
    adminOnly: false,
    commandCategory: "Utility",
    guide: "Just type 'owner' and the bot will reply automatically.",
    cooldowns: 5,
    usePrefix: false,

    // 🔹 Command execution (if user types /owner manually)
    async execute({ api, event }) {
        return sendOwnerInfo(api, event);
    },

    // 🔹 Auto-detect kapag may nag-chat ng "owner"
    async handleEvent({ api, event }) {
        if (!event.body) return;
        const msg = event.body.toLowerCase();

        // kapag may salitang "owner"
        if (msg.includes("owner")) {
            return sendOwnerInfo(api, event);
        }
    }
};

// 🔹 Common function para hindi ulit-ulit
async function sendOwnerInfo(api, event) {
    const { threadID, messageID } = event;

    const ownerInfo = {
        name: "Hridoy Khan", 
        facebook: "https://www.facebook.com/jaylordlapena2298",
        email: "jaylordlapena12@gmail.com",
        bio: "Developer and creator of Gag Bot and Jandel Bot. Passionate about coding and AI."
    };

    const gifPath = path.join(__dirname, '../../assets/owner.gif');

    try {
        const asciiArt = `
╔════════════════════╗
║     OWNER INFO     ║
╠════════════════════╣
║ Name: ${ownerInfo.name}
║ Facebook: ${ownerInfo.facebook}
║ Email: ${ownerInfo.email}
║ Bio: ${ownerInfo.bio}
╚════════════════════╝
Feel free to reach out! 😊
`;

        let msg = { body: asciiArt };

        if (fs.existsSync(gifPath)) {
            msg.attachment = fs.createReadStream(gifPath);
        }

        await api.sendMessage(msg, threadID, messageID);

    } catch (error) {
        console.log(`Error sending owner info: ${error.message}`);
        await api.sendMessage(
            `👤 Owner: ${ownerInfo.name}\nGitHub: ${ownerInfo.github}\nFacebook: ${ownerInfo.facebook}\nEmail: ${ownerInfo.email}\nBio: ${ownerInfo.bio}`,
            threadID,
            messageID
        );
    }
}
