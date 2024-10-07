import Html from "../../Library/html.js";
import Vfs from "../../Library/Filesystems/Virtual.js";

let wrapper;

const pkg = {
  name: "Envy Startup",
  type: "app",
  privs: 1,
  start: async function (Root) {
    console.log("[BM] Loading success.", Root);
    if (await Vfs.exists("Root/Library/config/oobe.config") == true) {
      await Root.Core.pkg.run("Core:Login", [], true);
      await Root.Core.pkg.run("services:UiLib", [], true);
    } else {
      await Root.Core.pkg.run("Core:OOBE", [], true);
    }
  },
  end: async function () {
    wrapper.cleanup();
  },
};

export default pkg;