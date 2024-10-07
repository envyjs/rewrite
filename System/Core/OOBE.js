import Html from "../../Library/html.js";
import langManager from "../../Library/Language Data/manager.js";

let myWindow;

const pkg = {
  name: "Envy First Time Setup",
  type: "app",
  privs: 0,
  start: async function (Root) {

    // Add content to the window
    let bg = new Html("div").class("login").appendTo("body")

    let main = new Html("div").style({display: "flex", "flex-direction": "row", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", gap: "200px"}).appendMany(
      new Html("div").style({"margin-top": "120px"}).appendMany(
        new Html("img").attr({src: "../../Library/System Icons/s1.png", height: "150px"})
      ),
      new Html("div").appendMany(
        new Html("h1").text(langManager.getString("oobe.wel"),),
        new Html("p").text(langManager.getString("oobe.lang"),),
        new Html("div").style({"overflow-y": "auto", "max-height": "200px", gap: "10px", "border-radius": "5px", "padding-top": "10px"}).appendMany(
          new Html("button").text("English (United States)").on("click", () => {langManager.setLanguage("en_US");}),
          new Html("br"), 
          new Html("br"), 
          new Html("button").text("English (United Kingdom)"),
          new Html("br"), 
          new Html("br"), 
          new Html("button").text("English (United Kingdom)"),
          new Html("br"), 
          new Html("br"), 
          new Html("button").text("English (United Kingdom)"),
          new Html("br"), 
          new Html("br"), 
          new Html("button").text("English (United Kingdom)"),
          new Html("br"), 
          new Html("br"), 
          new Html("button").text("English (United Kingdom)"),
          new Html("br"), 
          new Html("br"), 
          new Html("button").text("English (United Kingdom)"),
          new Html("br"), 
          new Html("br"), 
          new Html("button").text("English (United Kingdom)"),
          new Html("br"), 
          new Html("br"), 
          new Html("button").text("English (United Kingdom)"),
        ),
        new Html("br"), 
        new Html("button").text(langManager.getString("general.next"))
      ),
    ).appendTo("body");
  },
  end: async function () {
    // Close the window when the process is exited
    bg.cleanup();
    main.cleanup();
  },
};

export default pkg;