// Envy Syvan core
// (C) Envy Group 2024
// original Cherry Tree core codebase by kat21 and lap

import Html from "./Library/html.js";
import Modal from "./Library/Modal.js";
import Vfs from "./Library/Filesystems/Virtual.js";
import langManager from "./Library/Language Data/manager.js";
import Ws from "./Library/windowSystem.js";
import css from "./libs/css.js";

const systemInfo = {
  codename: "Baijiu",
  string: "Envy 10 2025 Update",
  version: "10.0.1222",
  pr: "Public Alpha 3"
};

console.log("Running Envy version", systemInfo.version);

(async () => {
  let Security = {};
  let Libs = {
    Html,
    startPkg(pkgName, args) {
      return Core.pkg.run(pkgName, args, false);
    },
    Window: Ws.data.win,
  };
  let Processes = {
    list: [],

    get(id) {
      const i = Processes.list[id];
      if (i) {
        return {
          name: i.name,
          pid: i.pid,
          type: i.type,
        };
      }
    },
    getService(name) {
      const p = Processes.list
        .filter((p) => p.type === "svc")
        .find((p) => p.svcName === name);
      if (p !== undefined) return { data: p.data };
    },
  };
  let Core = {
    process: {
      findEmptyPid: function () {
        let r = Processes.list.findIndex((p) => p === null);
        return r !== -1 ? r : Processes.list.length;
      },

      cleanup: function (pid) {
        if (Processes.list[pid]) Processes.list[pid] = null;
        return;
      },
    },
    pkg: {
      startFromUrl: async function (
        url,
        Arguments,
        RunWithoutSecurity = false
      ) {
        const pkg = await import(url);
        const pkgData = pkg.default;
        let privs = false;

        // Validate package information
        if (!pkgData || typeof pkgData !== "object") return { success: false, reason: "pkgData is not an object" };
        if (!pkgData.start || typeof pkgData.start !== "function") return { success: false, reason: "pkgData.start is not a function" };
        if (!pkgData.end || typeof pkgData.end !== "function") return { success: false, reason: "pkgData.end is not a function" };
        if (!pkgData.name || typeof pkgData.name !== "string") return { success: false, reason: "pkgData.name is not a string" };
        if (!pkgData.type || typeof pkgData.type !== "string") return { success: false, reason: "pkgData.type is not a string" };
        if (
          pkgData.svcName !== undefined &&
          typeof pkgData.svcName !== "string"
        )
          return { success: false, reason: "pkgData.svcName is defined but is not a string" };
        if (pkgData.data !== undefined && typeof pkgData.data !== "object")
          return { success: false, reason: "pkgData.data is not an object" };
        if (pkgData.privs === undefined || typeof pkgData.privs !== "number")
          return { success: false, reason: "pkgData.privs is not a number" };

        // Bypass security checks (For system apps)
        if (RunWithoutSecurity === false) {
          if (pkgData.privs === 1) {
            if ((await Modal.prompt(langManager.getString("security.title"), langManager.getString("security.description", { name: pkgData.name }))) === true) {
              privs = true;
            } else {
              privs = false;
            }
          }
        } else {
          privs = pkgData.privs === 1 ? true : false;
        }

        // Look into the package data
        const pkgHasData = pkgData.data !== undefined;
        let data = undefined;

        // Assign package type (usually "app")
        let pkgType = pkgData.type;
        let svcName = pkgData.svcName;

        if (pkgHasData) {
          data = pkgData.data;
          pkgType = "svc"; // Service means it does have accessible data
        }

        const pid = Core.process.findEmptyPid();

        Processes.list[pid] = {
          pid,
          name: pkgData.name,
          type: pkgType,
          privs: pkgData.privs,
          data,
          async end() {
            console.log("Attempting to end pkg:", pkgData.name);

            const result = await pkgData.end();

            // If the process doesn't want to end it can return false
            if (result !== false) Core.process.cleanup(pid);
          },
        };

        if (svcName !== undefined) Processes.list[pid].svcName = svcName;

        const Root = {
          Arguments,
          Libs,
          Core: privs === true ? Core : undefined,
          Processes: {
            list: privs === true ? Processes.list : undefined,
            get: Processes.get,
            getService: Processes.getService,
          },
          systemInfo,
          async end() {
            console.log("Attempting to end pkg:", pkgData.name);

            const result = await pkgData.end();

            // If the process doesn't want to end it can return false
            if (result !== false) Core.process.cleanup(pid);
          },
        };

        pkg.default.start(Root);

        return Processes.list[pid];
      },

      run: async function (url, args, rwp) {
        const appCat = url.split(":");
        const cat = appCat[0];
        const nam = appCat[1];
        const securedCats = ["Core", "Services"];
        return await this.startFromUrl(
          `./System/${cat}/${nam}.js`,
          args,
          rwp !== true ? securedCats.includes(cat) : true
        );
      },
    },
  };

  // For debugging purposes
  window.Core = Core;
  window.Processes = Processes;
  window.Security = Security;
  window.Libs = Libs;
  window.css = css;
  window.Html = Html;
  window.Vfs = Vfs;
  window.Ws = Ws;

  Ws.init(Core);

  console.log(
    "%cBoo!\n%cIf someone told you to copypaste something here, there's a 11/10 chance you don't know what you're doing. \n \nPasting any code into this console can expose your private account information and/or files to external sources. Use this console at your own risk.%c\n\nIn the rare case that you %cdo %cknow what you're doing, please contribute to this project kthxbye :3 \n\nhttps://github.com/envyjs/os",
    "color: magenta;font-size: 78px",
    "color: auto;font-size: large;",
    "color: auto;font-size:1.2rem",
    "color: auto;font-style:italic;font-size:1.2rem",
    "color: auto;font-size:1.2rem"
  );

  const loadingScreen = document.querySelector("#loading");
    const loadingStyle = document.querySelector("#TEMP_STYLE");

    if (loadingScreen)
      loadingScreen.querySelector(".spinner").classList.add("fadeOut");
    setTimeout(() => {
      if (loadingScreen) loadingScreen.classList.add("fadeOutSlow");
      setTimeout(() => {
        if (loadingScreen) loadingScreen.remove();
        if (loadingStyle) loadingStyle.remove();
      }, 1500);
    }, 500);


  Core.pkg.run("Core:BootManager", {
    time: performance.now(),
  });
})();