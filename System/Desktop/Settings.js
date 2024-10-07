import Html from "../../Library/html.js";
import Ws from "../../Library/windowSystem.js";

let myWindow;

const pkg = {
  name: "Settings",
  type: "app",
  privs: 0,
  start: async function (Root) {
    // Testing

    // Create a window
    myWindow = new Libs.Window({
      title: "Settings",
      height: "400px",
      width: "650px"
    });

    // Get the window body
    const wrapper = myWindow.window.querySelector(".win-content");

    // Add content to the window
    new Html("div").style({"margin-left": "20px"}).appendMany(
      new Html("h2").text("General"),
      new Html("button").style({display: "flex", width: "220px", "height": "65px", "text-align": "left"}).appendMany(
        new Html("div").appendMany(
          new Html("img").attr({src: "./Library/System Icons/envy.svg", height: "30px"}).style({"margin-top": "13px", "margin-left": "10px"})
        ),
        new Html("div").style({"margin-left": "10px", "margin-top": "1px", "line-height": "5px"}).appendMany(
          new Html("h3").text("Envy"),
          new Html("p").text("Version " + Root.systemInfo.version)
        )
      )
    ).appendTo(wrapper)
  },
  end: async function () {
    // Close the window when the process is exited
    myWindow.close();
  },
};

export default pkg;