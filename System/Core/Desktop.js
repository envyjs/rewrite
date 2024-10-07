import Html from "../../Library/html.js";
import Vfs from "../../Library/Filesystems/Virtual.js";
import langManager from "../../Library/Language Data/manager.js";

let wrapper;

const pkg = {
  name: "Envy Desktop",
  type: "app",
  privs: 0,
  start: async function (Root) {
    await Vfs.writeFile(`Root/Library/config/oobe.config`, 'yes');
    // Get the window body
    wrapper = new Html("div").class("desktop").appendTo("body");

    const taskbar = new Html("div").class("taskbar").appendTo(wrapper);

    let menuStateEnvy = false;

    new Html("img").class("start").style({"margin-left": "20px"}).attr({src: "./Library/System Icons/envy.svg"}).on("click", () => {
      menuStateEnvy = !menuStateEnvy;

      menuStateEnvy
        ? sm.classOff("smhide").classOn("smshow")
        : sm.classOn("smhide").classOff("smshow");
    }).appendTo(taskbar);

    const taskbarDock = new Html("div").class("taskbar-dock").appendTo(taskbar);

    new Html("div").style({"text-align": "right", "margin-right": "20px", "line-height": "8px"}).appendMany(
      new Html("div").id("clock"),
      new Html("div").id("dateDisplay").style({"font-size": "12px", "margin-top": "7px"})
    ).appendTo(taskbarDock);

    const sm = new Html("div").class("smmenu", "smhide").appendTo(taskbar);

    new Html("div").appendMany(
      new Html("h2").text(langManager.getString("launcher.title")),
      new Html("button").style({height: "50px", "margin-right": "10px"}).appendMany(
        new Html("p").text("Linux")
      ).on("click", () => {Core.pkg.run("Desktop:Linux", [], true);}),
      new Html("button").style({height: "50px", "margin-right": "10px"}).appendMany(
        new Html("p").text("Terminal")
      ).on("click", () => {Core.pkg.run("Desktop:Terminal", [], true);}),
      new Html("button").style({height: "50px", "margin-right": "10px"}).appendMany(
        new Html("p").text("WINE")
      ).on("click", () => {Core.pkg.run("Desktop:Wine", [], true);}),
      new Html("br"),
      new Html("br"),
    ).appendTo(sm)

    function timeUpdate() {
      // 24-hour time example
      let x = new Date();
      let hours = x.getHours().toString().padStart(2, "0"); // 18
      let minutes = x.getMinutes().toString().padStart(2, "0"); // 37
      let timeString = `${hours}:${minutes}`; // 18:37
      let element = document.getElementById("clock"); // assuming <... id="clock" ...>
      element.innerText = timeString;
    }
    timeUpdate();
    setInterval(timeUpdate, 1000); // 1000ms -> 1 second delay

    function formatDate() {
      const date = new Date(); // Get current date
  
      // Array of day names
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
      // Array of month names
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
      // Get day, month, and date
      const dayName = daysOfWeek[date.getDay()]; // Get day of the week
      const monthName = months[date.getMonth()]; // Get month name
      const dayNumber = date.getDate(); // Get day number
  
      // Combine the values to get the desired format
      return `${dayName}, ${dayNumber} ${monthName}`;
  }
  
  // Function to set the formatted date to the div
  function setDate() {
      const dateDisplayDiv = document.getElementById("dateDisplay"); // Get the div element
      dateDisplayDiv.textContent = formatDate(); // Set the formatted date
  }
  
  // Call the function to set the date
  setDate();

  setInterval(setDate, 1000); // 1000ms -> 1 second delay

    // apps.forEach((a) => {
    //   taskbarDock.append(new Html());
    // });
  },
  end: async function () {
    // Close the window when the process is exited
    wrapper.cleanup();
  },
};

export default pkg;