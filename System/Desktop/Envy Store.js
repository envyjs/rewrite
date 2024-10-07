import Html from "../../libs/html.js";
import TwinBox from "../../libs/twinbox.js";
import css from "../../libs/css.js";
import Vfs from "../../libs/vfs.js";

let myWindow;

//has not been updated since 10 2024 update, working on a rewrite
// starting off with a conversion from Twinbox to WSWindow
const pkg = {
  name: "Envy Store",
  type: "app",
  privs: 1,
  start: async function (Root) {
    myWindow = new Root.Libs.Window({
      title: "Envy Store (WSWINDOW BETA)",
      height: "500px",
      width: "770px"
    });

    // Get the window body
    const wrapper = myWindow.window.querySelector(".win-content");

    await Vfs.importFS();

    // Add content to the window
    try {
      new Html("p").text("Fetching store content, please wait...").appendTo(wrapper);
      async function storeLoad() {
        const response = await fetch("https://envyjs.github.io/appstore/root.json");
        const apps = await response.json();
        return apps;
      }
      let storeApps = await storeLoad();

      // clear the content
      wrapper.innerHTML = ``;

      new Html("h1").text("Welcome to the Envy Store").appendTo(wrapper);

      for (const app of storeApps) {
        // add app to the store listing

        // very basic wip version yes
        new Html("button").style({ background: "none", height: "75px", width: "99%", "color": "white", "border": "2px solid #fff3", cursor: "pointer", "padding-bottom": "5px" }).appendMany(
          new Html("div").style({ display: "flex", "text-align": "center", "flex-direction": "row", "align-items": "center", "margin-top": "5px", gap: '6px', "margin-left": "7px" }).appendMany(
            new Html("img").attr({ src: `https://envyjs.github.io/appstore/${app.id}/app.jpg`, height: "48px", width: "48px" }).style({ "border-radius": "5px" }),
            new Html('div').styleJs({
              display: 'flex', 'flexDirection': 'column', textAlign: "left",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "4px"
            }).appendMany(
              new Html("h2").style({ "margin": "0" }).text(`${app.name}`).appendMany(new Html('span').html('&nbsp;'), new Html('small').style({"font-size": "12px"}).text(`by ${app.author} • ${app.category}`)),
              new Html("p").style({ "margin": "0", }).text(`${app.shortDescription}`)
            )
          )
        ).on('click', async () => {
          const content = await (await fetch(`https://envyjs.github.io/appstore/${app.id}/App.js`)).text();
          Root.Core.pkg.startFromUrl(`https://envyjs.github.io/appstore/${app.id}/App.js`);
          Root.Core.pkg.run("Core:Installed");

          try {
            let fileContent = await Vfs.readFile("Root/Library/Config/InstalledApps/AppListing.json")

            let files = [];

            if (fileContent !== null) {
              let f = JSON.parse(fileContent);
              if (Array.isArray(f)) files = f;
            }

            if (files.find(a => a.id === app.id) === undefined) {
              files.push(app);
            }

            await Vfs.writeFile("Root/Library/Config/InstalledApps/AppListing.json", JSON.stringify(files));

            let [maker, appId] = app.id.split('/');

            await Vfs.createFolder(`Root/Library/Config/InstalledApps/${maker}`);
            await Vfs.createFolder(`Root/Library/Config/InstalledApps/${maker}/${appId}`);
            await Vfs.writeFile(`Root/Library/Config/InstalledApps/${maker}/${appId}/App.js`, content);
          } catch (e) {
            console.log('Failed to save downloaded app.');
          }

          document.dispatchEvent(new CustomEvent("Envy.Ui.AppListRefresh"));

        }).appendTo(wrapper);
        new Html("br").appendTo(wrapper);
        new Html("br").appendTo(wrapper);

      }

      console.log(wb);
    } catch (e) {
      console.error(e);
      wrapper.innerHTML = ``;
      new Html("div").style({position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", display: "flex", "flex-direction": "column", "justify-content": "center", "align-items": "center", "text-align": "center"}).appendMany(
        new Html("img").attr({src: "../../Library/System Icons/whoops.svg"}).style({"margin-left": "70px", "margin-bottom": "30px"}),
        new Html("h1").text("Ah, crap!"),
        new Html("p").text("Envy Store is dating the Internet, how dare you separate them??"),
        new Html("a").style({color: "white"}).attr({href: "https://www.example.com"}).text("Whine about it on Mastodon.")
      ).appendTo(wrapper);
    }
  },
  end: async function () {
    // Close the window when the process is exited
    wb.close();
  },
};

export default pkg;
