// deps:
// npm i -s @chatopera/sdk

// load env
const _envFs = require("fs").readFileSync(require("path").join(__dirname, ".env"), 'utf-8')
_envFs.split(/\r?\n/).forEach(line => {
    line = line.trim()
    if (line.startsWith("#")) return;
    if (line.startsWith("//")) return;
    if (!line.includes("=")) return;

    if (line.startsWith("export ")) line = line.replace("export ", "")
    if (line.startsWith("EXPORT ")) line = line.replace("EXPORT ", "")

    let sep = line.indexOf("=");
    let key = line.slice(0, sep);
    let value = line.slice(sep + 1);
    process.env[key] = value

});

const { Chatbot } = require("@chatopera/sdk");

console.log(`>> connect to bot ${process.env["BOT_CLIENT_SECRET"]}/*** on ${process.env["BOT_PROVIDER"]}`)
let bot = new Chatbot(process.env["BOT_CLIENT_ID"], process.env["BOT_CLIENT_SECRET"], process.env["BOT_PROVIDER"])

async function main() {
    // check bot, 接口介绍：https://docs.chatopera.com/products/chatbot-platform/references/sdk/chatbot/basic.html
    let resp = await bot.command("GET", "/");
    if (resp.rc != 0) {
        console.log("info", resp);
        console.log("Invalid bot info.");
    }

    // chat, 接口介绍: https://docs.chatopera.com/products/chatbot-platform/references/sdk/chatbot/chat.html#%E6%A3%80%E7%B4%A2%E5%A4%9A%E8%BD%AE%E5%AF%B9%E8%AF%9D
    resp = await bot.command("POST", "/conversation/query", {
        fromUserId: "zhangsan",
        textMessage: "查看信息",
        faqBestReplyThreshold: 0.6,
        faqSuggReplyThreshold: 0,
        extras: {
            foo: "bar"
        }
    })

    console.log(JSON.stringify(resp, null, 2))
}


(async function () {
    await main();
    process.exit(0);
})();
