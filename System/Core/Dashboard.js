import Html from "../../Library/html.js";
import Ws from "../../Library/windowSystem.js";
let myWindow;

const pkg = {
  name: "Envy Dashboard",
  type: "app",
  privs: 0,
  start: async function (Root) {
    document.documentElement.dataset.dashboardActive = "yes"

    // Add content to the window
    new Html("div").class("dashboard").appendMany(
      new Html("h1").text("Envy 10 2025 Update Dashboard " + Root.systemInfo.version),
      new Html("img").attr({src: "../../Library/System Icons/envy.svg", height: "30px"}).style({position: "absolute", bottom: "40px", right: "50px"})
    ).appendTo("body");
  },
  end: async function () {
    // Close the window when the process is exited
    myWindow.close();
  },
};

export default pkg;