import Html from "../../Library/html.js";
import Vfs from "../../Library/Filesystems/Virtual.js";
// adding vfs bc i might add a config for password (maybe /library/config/lock/)

let wrapper;

const pkg = {
  name: "Envy Login Enviornment",
  type: "app",
  privs: 1,
  start: async function (Root) {
    wrapper = new Html("div").class("login").appendTo("body")

    Root.Core.pkg.run("Desktop:NGL", [], true);
  },
  end: async function () {
    // Close the window when the process is exited
    wrapper.cleanup();
  },
};

export default pkg;