let pid = -1;
let token = "";

export default {
  name: "BootLoader",
  description: "Handles loading and startup",
  ver: "v1.6.2", // Supports minimum Core version of v1.6.2
  type: "process",
  exec: async function (Root) {
    const serviceList = ["Account"];

    // Root is just a temp name for the global object the core gives you
    if (pid !== -1) {
      console.log("%BootLoader called twice, aborting", "color:red");
      console.log(Root);
      const x = Root.Lib.cleanup(Root.PID, Root.Token);
      console.log(x); // true
      return {};
    }
    pid = Root.PID;
    token = Root.Token;

    // Make app
    const FileMapping = await Root.Core.startPkg("lib:FileMappings");
    // start loading screen
    try {
      const serviceReference = [];

      for (let i = 0; i < serviceList.length; i++) {
        let r = await Root.Core.startPkg("services:" + serviceList[i]);
        serviceReference.push({ name: serviceList[i], ref: r?.proc || r });
      }

      if (
        localStorage.getItem("error") != null &&
        localStorage.getItem("error") === "force"
      )
        throw new Error("Core forced panicked using error value.");

      Root.Core.services = serviceReference;
      // await Root.Core.startPkg('ui:LoginScreen');

      // Start of global customization config

      let vfs = await Root.Core.startPkg("lib:VirtualFS");
      await vfs.importFS();

      if (await vfs.exists("Root/Library/Subsystems/Pluto/config/fsVersionUpdate.txt")) {
        let version = await vfs.readFile(
          "Root/Library/Subsystems/Pluto/config/fsVersionUpdate.txt"
        );

        if (Number(version) < Root.Lib.systemInfo.version) {
          await vfs.importFS();
          await vfs.merge();
        } else {
          await vfs.importFS();
        }
      } else {
        await vfs.importFS();
      }
      console.log(Root.Lib.systemInfo);
      await vfs.writeFile(
        "Root/Library/Subsystems/Pluto/config/fsVersionUpdate.txt",
        Root.Lib.systemInfo.version.toString()
      );
      let appearanceConfig = JSON.parse(
        await vfs.readFile("Root/Library/Subsystems/Pluto/config/appearanceConfig.json")
      );

      if (appearanceConfig.sidebarType) {
        document.documentElement.dataset.sidebarType =
          appearanceConfig.sidebarType;
      }
      if (appearanceConfig.dockStyle) {
        document.documentElement.dataset.dockStyle = appearanceConfig.dockStyle;
      }
      if (appearanceConfig.dockShowTray !== undefined) {
        document.documentElement.dataset.dockShowTray =
          appearanceConfig.dockShowTray;
      }
      if (appearanceConfig.dockShowAssistant !== undefined) {
        document.documentElement.dataset.dockShowAssistant =
          appearanceConfig.dockShowAssistant;
      }
      if (
        appearanceConfig.language &&
        Root.Lib.langs.includes(appearanceConfig.language)
      ) {
        Root.Core.setLanguage(appearanceConfig.language);
      }

      if (appearanceConfig["shh"] === true) {
        window.__DEBUG = true;
      }

      if (await vfs.exists("Root/Library/Subsystems/Pluto/config/settingsConfig.json")) {
        let settingsConfig = JSON.parse(
          await vfs.readFile("Root/Library/Subsystems/Pluto/config/settingsConfig.json")
        );
        if (
          settingsConfig !== undefined &&
          settingsConfig.bootApp !== undefined
        ) {
          let appMapping = await FileMapping.retrieveAllMIMEdata(
            settingsConfig.bootApp,
            vfs
          );
          appMapping.onClick(Root.Core);
          // await Root.Core.startPkg(
          //   mapping.onClick(Root.Core);
          //   await vfs.readFile(settingsConfig.bootApp),
          //   false,
          //   true
          // );
        } else {
        }
      } else {
      }

      const searchParams = new URLSearchParams(location.search);

      async function checkPackageBoot() {
        if (searchParams.has("pkg")) {
          const pkg = searchParams.get("pkg");
          if (pkg.startsWith("app:")) {
            // load custom app from fs
            const appExists = await vfs.exists(pkg.slice(4));

            if (!appExists) return;

            const app = await vfs.readFile(pkg.slice(4));

            const p = await Root.Core.startPkg(
              "data:text/javascript," + encodeURIComponent(app),
              false,
              true
            );

            if (searchParams.has("data")) {
              p.proc.send(JSON.parse(searchParams.get("data")));
            }
          } else {
            // load system app
            const p = await Root.Core.startPkg(pkg, true, true);

            if (searchParams.has("data")) {
              try {
                p.proc.send(JSON.parse(searchParams.get("data")));
              } catch (e) {}
            }
          }
        } else {
          if (
            appearanceConfig["hasSetupSystem"] === undefined ||
            appearanceConfig["hasSetupSystem"] === false
          ) {
          }
        }
      }

      await checkPackageBoot();

      // await checkTheme();
      // Console
      const consoleApp = await Root.Core.startPkg("system:Console", true, true);

      document.addEventListener("keydown", (e) => {
        if (e.key === "~") {
          e.preventDefault();
          if (e.repeat) return;
          consoleApp.proc.send({ type: "toggle" });
        }
      });
    } catch (e) {
      window.err = e;
      Root.Core.startPkg("system:Basic");
      // Root.Modal.alert(
      //   "BootLoader Error",
      //   "Something went wrong while loading...\n\n" +
      //     e +
      //     "\n\n" +
      //     e.stack +
      //     "\n\n" +
      //     "Launching Basic Mode"
      // );
    }

    return Root.Lib.setupReturns((m) => {
      console.log("BootLoader received message: " + m);
    });
  },
};