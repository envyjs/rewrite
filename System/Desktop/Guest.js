import Html from "../../Library/html.js";
import Ws from "../../Library/windowSystem.js";

let myWindow;

const pkg = {
  name: "Example App",
  type: "app",
  privs: 0,
  start: async function (Root) {
    // Testing
    console.log("Hello from example app", Root);

    // Create a window
    myWindow = new Libs.Window({
      title: " ",
      height: "300px",
      width: "660px"
    });

    // Get the window body
    const wrapper = myWindow.window.querySelector(".win-content");

    // Add content to the window
    new Html("div").style({position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", display: "flex", "flex-direction": "column", "align-items": "center",}).appendMany(
      new Html("h2").text("You're logged in as a guest"),
      new Html("p").text("App data you create won't be preserved.")
    ).appendTo(wrapper)
  },
  end: async function () {
    // Close the window when the process is exited
    myWindow.close();
  },
};

export default pkg;