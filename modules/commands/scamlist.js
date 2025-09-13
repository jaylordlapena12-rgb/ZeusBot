module.exports = {
  name: "scamlist",
  version: "1.4.0",
  author: "ChatGPT + Edited",
  description: "Show fixed scammer list & auto scam detection",
  commandCategory: "Safety",
  guide: "/scamlist",
  cooldowns: 5,
  usePrefix: true,

  // 🔹 Static scammer list
  scammers: [
    { name: "YukieLopez", link: "https://www.facebook.com/share/1CYqPEycKp/" },
    { name: "ChristianExhibit", link: "https://www.facebook.com/share/179vDnMfmH/" },
    { name: "ClentJohnTulalian", link: "https://www.facebook.com/share/1E3znHcf8d/" },
    { name: "MitsuGt", link: "https://www.facebook.com/share/19syFSNmqU/" }
  ],

  // 🔹 Format scamlist message
  formatScamList() {
    let msg = `⚠️ Scammer List (Total: ${this.scammers.length}) ⚠️\n`;
    this.scammers.forEach((s, i) => {
      msg += `\n${i + 1}. ${s.name}\n🔗 ${s.link}\n`;
    });
    return msg.trim();
  },

  // 🔹 Auto detect scam messages
  async handleEvent({ event, api }) {
    const msg = event.body?.toLowerCase() || "";
    if (msg.includes("scam") || msg.includes("scammer")) {
      return api.sendMessage(this.formatScamList(), event.threadID, event.messageID);
    }
  },

  // 🔹 Run command (/scamlist)
  async execute({ api, event }) {
    return api.sendMessage(this.formatScamList(), event.threadID);
  }
};
