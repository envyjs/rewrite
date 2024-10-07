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
      title: "Next Gen Login",
      width: "800px",
      height: "600px"
    });

    // Get the window body
    const wrapper = myWindow.window.querySelector(".win-content");

    let hasClicked = false;
    document.addEventListener("click", (e) => {
      if (!hasClicked) {
        hasClicked = true;
        document.querySelector("audio").play();
      } 
    });

    new Html("div").style({position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", display: "flex", "justify-content": "center", "align-items": "center", gap: "30px"}).appendMany(
      new Html("div").style({cursor: "var(--cursor-pointer), auto", background: "blue", height: "200px", width: "200px", "text-align": "center", "padding-top": "35px", "border-radius": "5px", "background-image": "url('./Library/System\ Pictures/Sunset.jpg')", "background-size": "cover"}).appendMany(
        new Html("img").attr({src: "../../Library/User Pictures/Dave.png", height: "100px"}).style({"border-radius": "5px"}),
        new Html("p").text("Dave")
      ),
      new Html("div").style({cursor: "var(--cursor-pointer), auto",background: "blue", height: "200px", width: "200px", "text-align": "center", "padding-top": "35px", "border-radius": "5px", "background-image": "url('./Library/System\ Pictures/Threshold.jpg')", "background-size": "cover"}).appendMany(
        new Html("img").attr({src: "../../Library/User Pictures/kot.jpg", height: "100px"}).style({"border-radius": "5px"}),
        new Html("p").style({color: "black"}).text("Kot")
      ),
      new Html("div").style({position: "absolute", bottom: "-80px", cursor: "var(--cursor-pointer), auto"}).appendMany(
        new Html("p").text("Start Guest Session")
      ).on("click", () => {
        Root.end();
        Core.pkg.run("Core:Desktop", [], true);
        Core.pkg.run("Desktop:Guest", [], true);
      }),
      new Html("div").id("logclock").style({ color: "white", "font-size": "3.6em", "font-weight": "760", position: "absolute", bottom: "230px"}),
    ).appendTo(wrapper)

    function timeUpdate() {
      // 24-hour time example
      let x = new Date();
      let hours = x.getHours().toString().padStart(2, "0"); // 18
      let minutes = x.getMinutes().toString().padStart(2, "0"); // 37
      let timeString = `${hours}:${minutes}`; // 18:37
      let element = document.getElementById("logclock"); // assuming <... id="clock" ...>
      element.innerText = timeString;
    }
    timeUpdate();
    setInterval(timeUpdate, 1000); // 1000ms -> 1 second delay
  },
  end: async function () {
    // Close the window when the process is exited
    myWindow.close();
  },
};

export default pkg;