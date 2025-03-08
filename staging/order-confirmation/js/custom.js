/******************
 * STOPWATCH CLASS
 *****************/

function Stopwatch(config) {
  // If no config is passed, create an empty set
  config = config || {};
  // Set the options (passed or default)
  this.element = config.element || {};
  this.previousTime = config.previousTime || new Date().getTime();
  this.paused = config.paused && true;
  this.elapsed = config.elapsed || 0;
  this.countingUp = config.countingUp && true;
  this.timeLimit = config.timeLimit || (this.countingUp ? 60 * 10 : 0);
  this.updateRate = config.updateRate || 100;
  this.onTimeUp =
    config.onTimeUp ||
    function () {
      this.stop();
    };
  this.onTimeUpdate =
    config.onTimeUpdate ||
    function () {
      //console.log(this.elapsed);
    };
  if (!this.paused) {
    this.start();
  }
}

Stopwatch.prototype.start = function () {
  // Unlock the timer
  this.paused = false;
  // Update the current time
  this.previousTime = new Date().getTime();
  // Launch the counter
  this.keepCounting();
};

Stopwatch.prototype.keepCounting = function () {
  // Lock the timer if paused
  if (this.paused) {
    return true;
  }
  // Get the current time
  var now = new Date().getTime();
  // Calculate the time difference from last check and add/substract it to 'elapsed'
  var diff = now - this.previousTime;
  if (!this.countingUp) {
    diff = -diff;
  }
  this.elapsed = this.elapsed + diff;
  // Update the time
  this.previousTime = now;
  // Execute the callback for the update
  this.onTimeUpdate();
  // If we hit the time limit, stop and execute the callback for time up
  if (
    (this.elapsed >= this.timeLimit && this.countingUp) ||
    (this.elapsed <= this.timeLimit && !this.countingUp)
  ) {
    this.stop();
    this.onTimeUp();
    return true;
  }
  // Execute that again in 'updateRate' milliseconds
  var that = this;
  setTimeout(function () {
    that.keepCounting();
  }, this.updateRate);
};

Stopwatch.prototype.stop = function () {
  // Change the status
  this.paused = true;
};

var counter = document.getElementById("countdown1");
var counter2 = document.getElementById("countdown2");
var counter3 = document.getElementById("countdown3");
var counter4 = document.getElementById("countdown4");

function countdown(element, paused, elapsed) {
  var stopwatch = new Stopwatch({
    element: element, // DOM element
    paused: paused, // Status
    elapsed: elapsed, // Current time in milliseconds
    countingUp: false, // Counting up or down
    timeLimit: 0, // Time limit in milliseconds
    updateRate: 100, // Update rate, in milliseconds
    onTimeUp: function () {
      // onTimeUp callback
      this.stop();
      $(this.element).html("00:00");
    },
    onTimeUpdate: function () {
      // onTimeUpdate callback
      var t = this.elapsed,
        h = ("0" + Math.floor(t / 3600000)).slice(-2),
        m = ("0" + Math.floor((t % 3600000) / 60000)).slice(-2),
        s = ("0" + Math.floor((t % 60000) / 1000)).slice(-2);
      var formattedTime = m + ":" + s;
      $(this.element).html(formattedTime);
    },
  });
}
document.getElementById("showsectiononrefresh").style.display = "none";
var checkVisit = localStorage.getItem("sectionShown");
if (checkVisit == "false") {
  document.getElementById("showsectiononrefresh").style.display = "none";
  // document.getElementById("shuffle").style.display = "none";
  //console.log("Have Not Watched the Video");
}
if (checkVisit == null) {
  document.getElementById("showsectiononrefresh").style.display = "none";
  // document.getElementById("shuffle").style.display = "none";
  //console.log("Initial Visit");
} else {
  document.getElementById("showsectiononrefresh").style.display = "block";
  // document.getElementById("shuffle").style.display = "block";
  setTimeout(function () {
    //console.log("Watched Video");
    var counter = document.getElementById("countdown1");
    var counter2 = document.getElementById("countdown2");
    var counter3 = document.getElementById("countdown3");
    var counter4 = document.getElementById("countdown4");
    countdown(counter, false, 900000);
    countdown(counter2, false, 900000);
    countdown(counter3, false, 900000);
    countdown(counter4, false, 900000);
    var visitCounterer = localStorage.getItem("visits");
    if (visitCounterer > 1) {
      function rotateNotification() {
        var parent = jQuery("#shuffle");
        var divs = parent.children();
        while (divs.length) {
          parent.append(
            divs.splice(Math.floor(Math.random() * divs.length), 1)[0]
          );
        }
      }

      var min = 15000;
      var max = 20000;

      jQuery("#shuffle").each(function () {
        jQuery(this).find(".saleverify-outer").removeClass("ActiveNotify");
        jQuery(this)
          .find(".saleverify-outer")
          .attr("style", "display: none !important");
      });
      setInterval(function () {
        rotateNotification();
        jQuery("#shuffle").each(function () {
          jQuery(this).find(".saleverify-outer").removeClass("ActiveNotify");
          jQuery(this)
            .find(".saleverify-outer")
            .attr("style", "display: none !important");
        });
        jQuery("#shuffle").each(function () {
          jQuery(this)
            .find(".saleverify-outer")
            .first()
            .addClass("ActiveNotify");
          jQuery(this)
            .find(".saleverify-outer")
            .first()
            .attr("style", "display: block !important");
          jQuery(this)
            .find(".saleverify-outer")
            .first()
            .attr("style", "opacity: 1 !important");
          jQuery(".ActiveNotify").css(
            "-webkit-animation-play-state",
            "running"
          );
          jQuery(".ActiveNotify").stop().fadeIn(3000).animate(
            {
              opacity: 1,
            },
            {
              queue: false,
              duration: 3000,
            }
          );

          setTimeout(function () {
            jQuery(".ActiveNotify").css(
              "-webkit-animation-play-state",
              "paused"
            );
          }, 2000);
          setTimeout(function () {
            jQuery(".ActiveNotify").stop().slideDown(3000).animate(
              {
                opacity: 0,
              },
              {
                queue: false,
                duration: 3000,
              }
            );
          }, 5000);
        });
      }, Math.floor(Math.random() * (max - min + 1) + min));
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  var attempts = 0;
  var watchEvents = function () {
    if (
      typeof smartplayer === "undefined" ||
      !(smartplayer.instances && smartplayer.instances.length)
    ) {
      if (attempts >= 10) return;
      attempts += 1;
      return setTimeout(function () {
        watchEvents();
      }, 1000);
    }

    let videoWrapper = document.querySelectorAll(".video-wrapper");
    let background = document.querySelectorAll(".backgroundBlack");
    let video = document.querySelector("#smartplayer");
    let videoPlayer = document.querySelector(".smartplayer-video");
    let smartplayVideo = document.querySelectorAll(".smartplay");

    video.style.padding = "56% 0 0";
    videoWrapper[1].style.width = "100%";

    for (let instance of smartplayer.instances) {
      instance.on("play", () => {
        for (let wrapper of videoWrapper) {
          wrapper.style.position = "absolute";
          wrapper.style.width = "100%";
          wrapper.style.height = "100vh";
          wrapper.style.maxHeight = "100vh";
          wrapper.style.maxWidth = "100vw";
          wrapper.style.top = 0;
          wrapper.style.left = 0;
        }
        for (let bg of background) {
          bg.style.maxWidth = "100vw";
          bg.style.height = "100vh";
          bg.style.maxHeight = "100vh";
          bg.style.background = "black";
        }
        jQuery("#video-mobile > div").css("padding-left", "0px");
        jQuery("#video-mobile > div").css("padding-right", "0px");
        jQuery("#video-mobile").css("padding-top", "0px");
        jQuery("#video-mobile").css("height", "100vh");
        jQuery("#video-mobile > div > div > div > div > div").css(
          "height",
          "100vh"
        );
        jQuery("#video-desktop > div > div > h1").css("display", "none");
        jQuery("#video-desktop > div > div > h2").css("display", "none");
        jQuery("#video-desktop > div > div > h3").css("display", "none");
        jQuery("#shuffle").css("display", "none");
        window.scrollTo(0, 0);
        video.style.height = "100vh";
        video.style.maxHeight = "100vh";
        video.style.padding = window.innerWidth < 700 ? "148% 0 0" : "0";
        smartplayVideo[1].style.padding = "148% 0 0";
        document.body.style.marginTop =
          window.innerWidth < 700 ? "0vh" : "100vh";
      });

      // Cancel fullscreen when paused
      instance.on("pause", () => {
        for (let wrapper of videoWrapper) {
          wrapper.style.position = "relative";
          wrapper.style.width = "100%";
          wrapper.style.height = "100%";
          wrapper.style.maxHeight = "auto";
        }
        for (let bg of background) {
          bg.style.maxWidth = "902px";
          bg.style.position = "relative";
          bg.style.height = "510px";
          bg.style.maxHeight = "none";
          bg.style.background = "none";
        }

        video.style.height = "100%";
        video.style.maxHeight = "none";
        video.style.padding = "0";
        document.body.style.marginTop = "0";
        jQuery("#video-mobile > div").css("padding-left", "15px");
        jQuery("#video-mobile > div").css("padding-right", "15px");
        jQuery("#video-mobile").css("padding-top", "20px");
        jQuery("#video-mobile").css("height", "auto");
        jQuery("#video-mobile > div > div > div > div > div").css(
          "height",
          "auto"
        );
        jQuery("#video-desktop > div > div > h1").css("display", "block");
        jQuery("#video-desktop > div > div > h2").css("display", "block");
        jQuery("#video-desktop > div > div > h3").css("display", "block");
      });
    }
  };
  watchEvents();
});

document.addEventListener("DOMContentLoaded", function () {
  /* You don't need to change the time below */
  var SECONDS_TO_DISPLAY = 12;
  var CLASS_TO_DISPLAY = ".esconder";
  var visited = Number(localStorage.getItem("visits")) || 0;
  var alreadyVisited = visited >= 1;
  localStorage.setItem("visits", visited + 1);
  var attempts = 0;
  var elsHiddenList = [];
  var elsDisplayed = false;
  var elsHidden = document.querySelectorAll(CLASS_TO_DISPLAY);
  var alreadyDisplayedKey = `alreadyElsDisplayed${SECONDS_TO_DISPLAY}`;
  var alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);

  setTimeout(function () {
    elsHiddenList = Array.prototype.slice.call(elsHidden);
  }, 0);

  var showHiddenElements = function () {
    //console.log(smartplayer.instances);
    elsDisplayed = true;
    elsHiddenList.forEach((e) => (e.style.display = "block"));
    localStorage.setItem(alreadyDisplayedKey, true);
    var counter = document.getElementById("countdown1");
    var counter2 = document.getElementById("countdown2");
    var counter3 = document.getElementById("countdown3");
    var counter4 = document.getElementById("countdown4");

    countdown(counter, false, 900000);
    countdown(counter2, false, 900000);
    countdown(counter3, false, 900000);
    countdown(counter4, false, 900000);

    function rotateNotification() {
      var parent = jQuery("#shuffle");
      var divs = parent.children();
      while (divs.length) {
        parent.append(
          divs.splice(Math.floor(Math.random() * divs.length), 1)[0]
        );
      }
    }

    var min = 15000;
    var max = 20000;

    jQuery("#shuffle").each(function () {
      jQuery(this).find(".saleverify-outer").removeClass("ActiveNotify");
      jQuery(this)
        .find(".saleverify-outer")
        .attr("style", "display: none !important");
    });
    setInterval(function () {
      rotateNotification();
      jQuery("#shuffle").each(function () {
        jQuery(this).find(".saleverify-outer").removeClass("ActiveNotify");
        jQuery(this)
          .find(".saleverify-outer")
          .attr("style", "display: none !important");
      });
      jQuery("#shuffle").each(function () {
        jQuery(this).find(".saleverify-outer").first().addClass("ActiveNotify");
        jQuery(this)
          .find(".saleverify-outer")
          .first()
          .attr("style", "display: block !important");
        jQuery(this)
          .find(".saleverify-outer")
          .first()
          .attr("style", "opacity: 1 !important");
        jQuery(".ActiveNotify").css("-webkit-animation-play-state", "running");
        jQuery(".ActiveNotify").stop().fadeIn(3000).animate(
          {
            opacity: 1,
          },
          {
            queue: false,
            duration: 3000,
          }
        );

        setTimeout(function () {
          jQuery(".ActiveNotify").css("-webkit-animation-play-state", "paused");
        }, 2000);
        setTimeout(function () {
          jQuery(".ActiveNotify").stop().slideDown(3000).animate(
            {
              opacity: 0,
            },
            {
              queue: false,
              duration: 3000,
            }
          );
        }, 5000);
      });
    }, Math.floor(Math.random() * (max - min + 1) + min));
  };

  var startWatchVideoProgress = function () {
    if (
      typeof smartplayer === "undefined" ||
      !(smartplayer.instances && smartplayer.instances.length)
    ) {
      if (attempts >= 10) return;
      attempts += 1;
      return setTimeout(function () {
        startWatchVideoProgress();
      }, 1000);
    }

    smartplayer.instances[0].on("timeupdate", () => {
      if (
        smartplayer.instances[0].analytics.player.options.id ==
        /* aqui eu coloquei o ID DO VÍDEO DESKTOP*/
        "65302aa7251cbe0009e53fca"
      ) {
        SECONDS_TO_DISPLAY = 2232;
      }
      if (
        smartplayer.instances[0].analytics.player.options.id ==
        /* aqui eu coloquei o ID DO VÍDEO MOBILE*/
        "6537f795e956e500094cd847"
      ) {
        SECONDS_TO_DISPLAY = 2232;
      }

      if (elsDisplayed || smartplayer.instances[0].smartAutoPlay) return;
      if (smartplayer.instances[0].video.currentTime < SECONDS_TO_DISPLAY)
        return;
      showHiddenElements();
      localStorage.setItem("sectionShown", true);
    });
  };

  if (alreadyElsDisplayed === "true" || alreadyVisited) {
  } else {
    startWatchVideoProgress();
  }
});

$(document).ready(function () {
  $('a[data-toggle="modal"]').on("click touchstart", function (e) {
    e.preventDefault();
    $($(this).data("target")).modal("show");
    console.log("Trigger Modal");
    setTimeout(function () {
      document.getElementById("fullscreenModal").style.display = "flex";
    }, 1000);
  });

  var closeButton = document.querySelector("#fullscreenModal button.close");
  var modal = document.querySelector("#fullscreenModal");

  if (closeButton) {
    $(closeButton).on("click", function (e) {
      // Check if it's a touch device
      if ("ontouchstart" in window || navigator.maxTouchPoints) {
        e.preventDefault();
        // Handle touch device modal close here
        console.log("Touch device modal close");
      }

      if (modal) {
        // Hide the modal using the Bootstrap method
        $(modal).modal("hide");
      }
    });
  }
});
