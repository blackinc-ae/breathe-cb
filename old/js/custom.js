$(document).ready(function () {
  var targetModal;

  $('a[data-toggle="modal"]').on("click touchstart", function (e) {
    e.preventDefault();
    targetModal = $($(this).data("target"));

    // Show the modal
    targetModal.modal("show");

    // Update display to flex
    targetModal.on("shown.bs.modal", function () {
      targetModal.css("display", "flex");
    });
  });

  var closeButton = $("#lastchancemodal > div > div > button.close");

  if (closeButton.length > 0) {
    closeButton.on("click", function (e) {
      // Check if it's a touch device
      if ("ontouchstart" in window || navigator.maxTouchPoints) {
        e.preventDefault();
      }

      // Hide the modal using the Bootstrap method
      if (targetModal) {
        targetModal.modal("hide");
      }
    });
  }
});

$("#floating-button").on("click touchstart", function () {
  var targetElement;

  // Check if it's a mobile device based on window width
  if ($(window).width() <= 767) {
    // Scroll to a different element for mobile
    targetElement = $("#offer1-mobile");
  } else {
    // Scroll to the original element for desktop
    targetElement = $("#offer1-desktop");
  }

  // Perform the scroll animation
  $("html, body").animate(
    {
      scrollTop: targetElement.offset().top,
    },
    1000
  );
});

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

/******************
 * COUNTDOWN CLASS
 *****************/

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
var elsHiddenList = [];
var alreadyDisplayedKey = `alreadyElsDisplayed${SECONDS_TO_DISPLAY}`;
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
      parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
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

document.getElementById("showsectiononrefresh").style.display = "none";
var checkVisit = localStorage.getItem("sectionShown");
var imgElement1 = document.querySelector("#video-desktop > div > div > img");
var imgElement2 = document.querySelector("#video-mobile > div > div > img");
var bluearrowd = document.querySelector("#video-desktop > div > div > img");
var bluearrowm = document.querySelector("#video-mobile > div > div > img");

var counter = document.getElementById("countdown1");
var counter2 = document.getElementById("countdown2");
var counter3 = document.getElementById("countdown3");
var counter4 = document.getElementById("countdown4");
/* You don't need to change the time below */
var SECONDS_TO_DISPLAY = 2080;

var startWatchVideoProgress = function () {
  console.log("Function Started");
  smartplayer.instances.forEach(function (instance) {
    instance.on("play", () => {
      console.log("Video is playing");
      // ... other code
    });

    instance.on("pause", () => {
      console.log("Video is paused");
      // ... other code
    });

    instance.on("timeupdate", () => {
      if (
        instance.analytics.player.options.id == "659c28dcc1c15b00093155d6" // Desktop video ID
      ) {
        SECONDS_TO_DISPLAY = 2080;
      } else if (
        instance.analytics.player.options.id == "659f72b7ddbca400090e6dcd" // Mobile video ID
      ) {
        SECONDS_TO_DISPLAY = 2080;
      }

      if (
        !instance.video.paused &&
        instance.video.currentTime >= SECONDS_TO_DISPLAY
      ) {
        if (checkVisit == null) {
          // alert(SECONDS_TO_DISPLAY);
          // alert(checkVisit);
          checkVisit = true;
          console.log("Show Contents");
          localStorage.setItem("sectionShown", true);
          contentsDisplayed = true;
          checkVisit = localStorage.getItem("sectionShown");
          document.getElementById("showsectiononrefresh").style.display =
            "block";
          document.getElementById("floating-button").style.opacity = "1";
          document.getElementById("shuffle").style.display = "block";
          imgElement1.style.display = "block";
          imgElement2.style.display = "block";
          bluearrowd.style.display = "block";
          bluearrowm.style.display = "block";
          setTimeout(function () {
            console.log("Watched Video");
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
                jQuery(this)
                  .find(".saleverify-outer")
                  .removeClass("ActiveNotify");
                jQuery(this)
                  .find(".saleverify-outer")
                  .attr("style", "display: none !important");
              });
              setInterval(function () {
                rotateNotification();
                jQuery("#shuffle").each(function () {
                  jQuery(this)
                    .find(".saleverify-outer")
                    .removeClass("ActiveNotify");
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
      }
    });
  });
};

setTimeout(function () {
  startWatchVideoProgress();
}, 1000);

document.addEventListener("DOMContentLoaded", function () {
  var attempts = 0;
  var visited = Number(localStorage.getItem("visits")) || 0;
  var alreadyVisited = visited >= 1;
  localStorage.setItem("visits", visited + 1);
  var attempts = 0;
  var alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);

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

if (checkVisit == "false") {
  document.getElementById("showsectiononrefresh").style.display = "none";
  document.getElementById("floating-button").style.opacity = "0";
  document.getElementById("shuffle").style.display = "none";
  imgElement1.style.display = "none";
  imgElement2.style.display = "none";
  bluearrowd.style.display = "none";
  bluearrowm.style.display = "none";
  console.log("Have Not Watched the Video");
}
if (checkVisit == null) {
  document.getElementById("showsectiononrefresh").style.display = "none";
  document.getElementById("floating-button").style.opacity = "0";
  document.getElementById("shuffle").style.display = "none";
  imgElement1.style.display = "none";
  imgElement2.style.display = "none";
  bluearrowd.style.display = "none";
  bluearrowm.style.display = "none";
  console.log("Initial Visit");
}
if (checkVisit === "true") {
  document.getElementById("showsectiononrefresh").style.display = "block";
  document.getElementById("floating-button").style.opacity = "1";
  document.getElementById("shuffle").style.display = "block";
  imgElement1.style.display = "block";
  imgElement2.style.display = "block";
  bluearrowd.style.display = "block";
  bluearrowm.style.display = "block";
  setTimeout(function () {
    console.log("Watched Video");
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
