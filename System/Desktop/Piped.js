import Html from "../../Library/html.js";
import Ws from "../../Library/windowSystem.js";

let myWindow;

const pkg = {
  name: "Example App",
  type: "app",
  privs: 0,
  start: async function (Root) {

    // Create a window
    myWindow = new Libs.Window({
      title: "Piped",
      height: "500px",
      width: "700px"
    });

    // Get the window body
    const wrapper = myWindow.window.querySelector(".win-content");

    // Add content to the window
    new Html("div").class("frame").appendMany(
      new Html("iframe").attr({ is: "x-frame-bypass", src: "https://piped.wireway.ch/trending"}).style({height: "100%", width: "100%", "overflow": "hidden"})
    ).appendTo(wrapper);
  },
  end: async function () {
    // Close the window when the process is exited
    myWindow.close();
  },
};

export default pkg;