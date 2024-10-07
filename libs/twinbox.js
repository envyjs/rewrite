// TwinBox compatibility layer for Envy 10
// Original TwinBox by kat21

let WinBox = Libs.Window;

export default async function TwinBox(args) {
  if (typeof args !== "object") throw new Error("Bad winbox arguments");
  let obj = {};
  for (const key in args) {
    obj[key] = args[key];
  }

  // add to desktop automatically
  if (obj["root"] === undefined) {
    obj["root"] = document.querySelector(".window-box");
  }

  if (obj["x"] === undefined && obj["y"] === undefined) {
    obj["x"] = "center";
    obj["y"] = "center";
  }

  if (obj["wb.body"]) {
    obj["wb.body"] = ".win-content";
  }

  // custom mica handler
  if (obj["mica"]) {
    if (obj["mica"] === true) {
      obj["mica"] = undefined;
      obj["oncreate"] = undefined;
      obj["onmove"] = undefined;
    }
  }

  // add padding if wanted
  if (obj["padding"]) {
    if (obj["padding"] === true) {
      obj["padding"] = undefined;
      if (obj["class"]) {
      } else {
        obj["class"] = "padded";
      }
    }
  }

  // animated closing
  if (obj["onclose"] === undefined) {
    obj["onclose"] = undefined;
  }

  if (obj['onminimize'] === undefined) {
    obj['onminimize'] = function () {
      return true;
    }
  }

  let wb = new WinBox(obj);


  return Object.assign({ body: wb.window.querySelector('.win-content') }, wb)
}
