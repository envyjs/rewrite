import Html from "/Library/html.js";

export default {
  modal: function (title, content, ...buttons) {
    if (content === undefined && title) {
      content = "" + title;
      title = "Alert";
    }
    const x = new Html("div")
      .class("modal")
      .html(
        '<div class="modal-content"><div class="modal-header"></div><div class="modal-body"></div></div>'
      );

    new Html("span")
      .text(title)
      .appendTo(x.elm.querySelector(".modal-content .modal-header"));
    new Html("span")
      .text(content)
      .appendTo(x.elm.querySelector(".modal-content .modal-body"));
    new Html("div")
      .class("flex-group")
      .appendTo(x.elm.querySelector(".modal-content .modal-body"));

    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      if (!button.text || !button.callback)
        throw new Error("Invalid button configuration");

      const b = new Html("button").text(button.text).on("click", (e) => {
        x.cleanup();
        button.callback(e);
      });

      if (button.type && button.type === "primary") b.class("primary");

      b.appendTo(x.elm.querySelector(".modal-content .flex-group"));
    }

    x.appendTo("body");
  },
  alert: function (title, content) {
    return new Promise((res, _rej) => {
      this.modal(title, content, {
        text: "OK",
        callback: (_) => res(true),
      });
    });
  },
  prompt: function (title, content) {
    return new Promise((res, _rej) => {
      this.modal(
        title,
        content,
        {
          text: "Yes",
          type: "primary",
          callback: (_) => res(true),
        },
        {
          text: "No",
          callback: (_) => res(false),
        }
      );
    });
  },
};