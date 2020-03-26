// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'tsv') {
        const allTexts = figma.currentPage.findAll().filter(item => {
            return item.type === "TEXT";
        });
        let hash = {};
        for (const line of msg.lines) {
            const pair = line.split("\t");
            hash[pair[0]] = pair[1].trim();
        }
        console.log(hash);
        const targetTexts = allTexts.filter(text => {
            return hash[text.name];
        });
        //本来は結果を返して視覚的に見えるようにしてあげると親切かも、例外発生時もその旨を伝えたい
        for (const target of targetTexts) {
            let beforeCharacters = target.characters;
            if (beforeCharacters == hash[target.name]) {
                console.log("[Skipped] id: " + target.id + ", name: " + target.name + ", characters: " + target.characters);
                continue;
            }
            try {
                console.log("[Difference] [" + target.characters + "] : [" + hash[target.name] + "]");
                console.log("[Replace] id: " + target.id + ", name: " + target.name + ", characters: " + target.characters);
                yield figma.loadFontAsync({ family: target.fontName["family"], style: target.fontName["style"] });
                target.characters = hash[target.name];
            }
            catch (error) {
                console.log("loadFontAsync failed. " + target.id + " , " + error);
            }
        }
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
});
