import Vfs from "../Filesystems/Virtual.js";

await Vfs.importFS();

let lang = (await Vfs.readFile("Root/Library/language")) || "en_US";
let strings = {};

try {
  let languageModule = (await import(`./${lang}.js`)).default;
  await Vfs.writeFile("Root/Library/language", lang);
  strings = languageModule;
} catch (e) {
  console.log("error");
}

const langManager = {
  async setLanguage(lang) {
    try {
      let languageModule = (await import(`./${lang}.js`)).default;
      await Vfs.writeFile("Root/Library/language", lang);
      strings = languageModule;
    } catch (e) {
      console.log("Failed to load strings!");
    }
    window.strings = strings;
  },
  getLanguage() {
    return lang;
  },
  getLanguageDisplayName() {
    return lang["languages"][lang];
  },
  getString(path, replacements = {}) {
    const parts = path.split(".");
    let current = strings;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (typeof current[part] === "undefined") {
        return path;
      }
      current = current[part];
    }
    if (typeof current === "string") {
      for (const key in replacements) {
        current = current.replace(`%${key}%`, replacements[key]);
      }
    }
    if (current === null || current === undefined) {
      return path;
    }
    return current;
  },
};
window.langManager = langManager;

export default langManager;
