const axios = require("axios");

module.exports = {
  name: "bot",
  version: "2.5.0",
  author: "ChatGPT + Edited",
  description: "Chat with Simsimi AI (stable, no history)",
  commandCategory: "AI",
  guide: "/bot <message>",
  cooldowns: 5,
  usePrefix: true,

  // 🔹 Command with prefix
  async execute({ api, event, args }) {
    let userMessage = args.join(" ").trim();
    if (!userMessage) {
      return api.sendMessage("❌ Please type a message.", event.threadID, event.messageID);
    }
    return simsimiReply(api, event, userMessage);
  },

  // 🔹 Auto-detect kapag may "jandel" o "bot"
  async handleEvent({ api, event }) {
    const rawMessage = event.body?.trim();
    if (!rawMessage) return;

    if (/\bjandel\b/i.test(rawMessage) || /\bbot\b/i.test(rawMessage)) {
      let cleaned = rawMessage
        .replace(/\bjandel\b/gi, "")
        .replace(/\bbot\b/gi, "")
        .trim();

      if (!cleaned) cleaned = "hello there";
      return simsimiReply(api, event, cleaned);
    }
  }
};

// 🔹 Simsimi handler (no history)
async function simsimiReply(api, event, userMessage) {
  api.setMessageReaction("🤖", event.messageID, () => {}, true);

  let reply = null;

  try {
    let res = await axios.get("https://simsimi.ooguy.com/sim", {
      params: { query: userMessage, apikey: "937e288d38e944108cc7c3de462fc35f6ce5a865" },
      timeout: 8000
    });

    reply = res.data?.respond;
  } catch (e) {
    console.error("❌ Simsimi API Error:", e.message);
  }

  // 🔹 Fallback if no reply
  if (!reply || reply.length < 2) {
    const fallbacks = [
      "😅 Hindi ako makakonek kay Simsimi ngayon.",
      "🤖 Pasensya, down yung Simsimi server.",
      "😕 Hindi ko gets, pwede mo ulitin?",
      "⚠️ Error sa Simsimi, pero nandito pa rin ako."
    ];
    reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  api.setMessageReaction("✅", event.messageID, () => {}, true);
  return api.sendMessage(reply, event.threadID, event.messageID);
}
