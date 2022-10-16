$(function () {
  let h = $(".chat")[0].scrollHeight;
  class robot {
    constructor() {
      this.init();
      window.that = this;
    }
    init() {
      $(".text").focus();
      $(".send").on("click", this.send);
      $(".text").on("keyup", function (e) {
        if (e.keyCode != 13) return;
        if ($(".text").val().length == 1) {
          $(".text").val("");
          return;
        }
        window.that.send();
      });
      $(".chat").on("scroll", function () {});
    }
    send() {
      if ($(".text").val() == "") return;

      let val = $(".text").val();
      $(".chat").append(
        "    <div class='cnt' >  <div class='userPic' ></div>  <div class='user_text' > " +
          val +
          " </div>   </div>     "
      );

      window.that.keepBottom();
      window.that.response();
    }

    response() {
      let val = $(".text").val();
      $(".text").val("");
      $.get({
        url: "http://www.liulongbin.top:3006/api/robot",
        data: {
          spoken: val,
        },
        success: function (e) {
          let text = e.data.info.text;
          $(".chat").append(
            "    <div class='cnt' >  <div class='rbPic' ></div>  <div class='rb_text' > " +
              text +
              " </div>   </div>     "
          );
          window.that.keepBottom();
          $.get({
            url: "http://www.liulongbin.top:3006/api/synthesize",
            data: {
              text: text,
            },
            success: function (e) {
              $("audio").prop("src", e.voiceUrl);
              $("audio")[0].play();
            },
          });
        },
      });
    }

    keepBottom() {
      if ($(".chat")[0].scrollHeight < h) return;
      $(".chat")[0].scrollTop = $(".chat")[0].scrollHeight - h;
    }
  }

  new robot();
});
