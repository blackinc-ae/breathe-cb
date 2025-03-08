document.addEventListener("DOMContentLoaded", function () {

  jQuery('.open-last-modal').on('click', function(e) {
    e.preventDefault();
    jQuery('.pop-up').addClass('active');
  })
  jQuery('.pop-up-close').on('click', function(e) {
    e.preventDefault();
    jQuery('.pop-up').removeClass('active');
  })
    

  
    var targetModal;
  
    var modalLinks = document.querySelectorAll('a[data-toggle="modal"]');
    modalLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        targetModal = document.querySelector(link.getAttribute("data-target"));
  
        // Show the modal
        targetModal.classList.add("show");
        document.body.classList.add("modal-open");
  
        // Update display to flex
        targetModal.addEventListener("shown.bs.modal", function () {
          targetModal.style.display = "flex";
        });
      });
    });
  
    var closeButton = document.querySelector(
      "#lastchancemodal > div > div > button.close"
    );
  
    if (closeButton) {
      closeButton.addEventListener("click", function (e) {
        // Check if it's a touch device
        if ("ontouchstart" in window || navigator.maxTouchPoints) {
          e.preventDefault();
        }
  
        // Hide the modal by removing the 'show' class
        targetModal.classList.remove("show");
        document.body.classList.remove("modal-open");
      });
    }
  });
  
  var floatingButton = document.querySelector("#floating-button");
  floatingButton.addEventListener("click", function () {
    var targetElement;
  
    // Check if it's a mobile device based on window width
    if (window.innerWidth <= 767) {
      // Scroll to a different element for mobile
      targetElement = document.querySelector("#offer1-mobile");
      console.log("Mobile");
    } else {
      // Scroll to the original element for desktop
      targetElement = document.querySelector("#offer1-desktop");
      console.log("Desktop");
    }
  
    // Perform the scroll animation
    if ("scrollBehavior" in document.documentElement.style) {
      console.log("Scrolling to:", targetElement.offsetTop);
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, targetElement.offsetTop);
    }
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
        this.element.innerHTML = "00:00";
      },
      onTimeUpdate: function () {
        // onTimeUpdate callback
        var t = this.elapsed,
          h = ("0" + Math.floor(t / 3600000)).slice(-2),
          m = ("0" + Math.floor((t % 3600000) / 60000)).slice(-2),
          s = ("0" + Math.floor((t % 60000) / 1000)).slice(-2);
        var formattedTime = m + ":" + s;
        this.element.innerHTML = formattedTime;
      },
    });
  }
  var elsHiddenList = [];
  var alreadyDisplayedKey = "alreadyElsDisplayed" + SECONDS_TO_DISPLAY;
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
      var parent = document.querySelector("#shuffle");
      var divs = Array.from(parent.children);
      while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
      }
    }
  
    var min = 15000;
    var max = 20000;
  
    var shuffleElements = document.querySelectorAll("#shuffle");
  
    shuffleElements.forEach(function (shuffleElement) {
      var saleverifyOuterElements =
        shuffleElement.querySelectorAll(".saleverify-outer");
  
      saleverifyOuterElements.forEach(function (saleverifyOuter) {
        saleverifyOuter.classList.remove("ActiveNotify");
        saleverifyOuter.style.cssText = "display: none !important";
      });
    });
  
    setInterval(function () {
      rotateNotification();
  
      shuffleElements.forEach(function (shuffleElement) {
        var saleverifyOuterElements =
          shuffleElement.querySelectorAll(".saleverify-outer");
  
        saleverifyOuterElements.forEach(function (saleverifyOuter) {
          saleverifyOuter.classList.remove("ActiveNotify");
          saleverifyOuter.style.cssText = "display: none !important";
        });
  
        var firstSaleVerifyOuter =
          shuffleElement.querySelector(".saleverify-outer");
  
        if (firstSaleVerifyOuter) {
          firstSaleVerifyOuter.classList.add("ActiveNotify");
          firstSaleVerifyOuter.style.cssText =
            "display: block !important; opacity: 1 !important";
  
          var activeNotifyElements = document.querySelectorAll(".ActiveNotify");
  
          activeNotifyElements.forEach(function (activeNotify) {
            activeNotify.style.webkitAnimationPlayState = "running";
            activeNotify.style.opacity = "1";
  
            setTimeout(function () {
              activeNotify.style.webkitAnimationPlayState = "paused";
            }, 2000);
  
            setTimeout(function () {
              activeNotify.style.opacity = "0";
            }, 5000);
          });
        }
      });
    }, Math.floor(Math.random() * (max - min + 1) + min));
  };
  
  document.getElementById("showsectiononrefresh").style.display = "none";
  var checkVisit = localStorage.getItem("sectionShown");
  var imgElement1 = document.querySelector("#video > div > div > picture");
  var bluearrowd = document.querySelector("#video > div > div > picture");
  
  var counter = document.getElementById("countdown1");
  var counter2 = document.getElementById("countdown2");
  var counter3 = document.getElementById("countdown3");
  var counter4 = document.getElementById("countdown4");
  /* You don't need to change the time below */
  var SECONDS_TO_DISPLAY = 2230;
  
  var startWatchVideoProgress = function () {
    console.log("Function Started");
  
    let isPageVisible = true;
    let isVideoVisible = true;
    let isVideoPlayed = false;
    let currentInstance = null; // Initialize currentInstance to null
    let hasTabSwitched = false;
  
    document.addEventListener("visibilitychange", function () {
      isPageVisible = !document.hidden;
      console.log(
        "Page visibility changed. Page is now " +
          (isPageVisible ? "visible" : "hidden")
      );
  
      // Check visibility on page change
      checkVisibility();
    });
  
    const smartPlayerContainer = document.querySelector("#smartplayer");
  
    // if (smartPlayerContainer) {
    //   const observer = new IntersectionObserver((entries) => {
    //     entries.forEach((entry) => {
    //       // Check if the entire video element is not in view
    //       isVideoVisible = entry.intersectionRatio > 0;
  
    //       if (!isVideoVisible) {
    //         console.log("Video is not in view");
    //         // Add your logic here
    //       } else {
    //         console.log("Video is in view");
    //       }
  
    //       // Check visibility on intersection change
    //       checkVisibility();
    //     });
    //   });
  
    //   observer.observe(smartPlayerContainer);
    // }
  
    smartplayer.instances.forEach(function (instance) {
      let isPlaying = false;
      let isFirstClick = true;
  
      instance.on("play", () => {

        if (smartplayer.instances[0].smartAutoPlay) return;

        window.scrollTo({
          top: 0,
          behavior: "instant",
        });

        console.log("Video is playing");
  
        // Check if the play event is user-initiated
        if (!isVideoPlayed && isPageVisible && !hasTabSwitched) {
          isVideoPlayed = true;
          console.log("First click on the video");
          // Add your logic for the first click on the video here
        }
  
        isPlaying = true; // Set the flag when the video starts playing
        currentInstance = instance; // Update the current instance
        checkVisibility();
      });
  
      instance.on("pause", () => {
        console.log("Video is paused");
        // Your existing code...
        isPlaying = false; // Reset the flag when the video is paused
        // checkVisibility(); // Check visibility when video is paused
        minimizeVideo();
      });
  
      instance.on("timeupdate", () => {
        // Your existing code...
        checkVisibility(); // Check visibility on time update
        if (
          instance.analytics.player.options.id == "65b182b67d14870008a0e3d7_0" // Desktop video ID
        ) {
          SECONDS_TO_DISPLAY = 2230;
        } else if (
          instance.analytics.player.options.id == "65b182ad7d14870008a0e3d0_0" // Mobile video ID
        ) {
          SECONDS_TO_DISPLAY = 2230;
        }
  
        if (
          !instance.video.paused &&
          instance.video.currentTime >= SECONDS_TO_DISPLAY
        ) {
          if (checkVisit == null) {
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
            bluearrowd.style.display = "block";
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
                  var parent = document.querySelector("#shuffle");
                  var divs = Array.from(parent.children);
                  while (divs.length) {
                    parent.append(
                      divs.splice(Math.floor(Math.random() * divs.length), 1)[0]
                    );
                  }
                }
                var min = 15000;
                var max = 20000;
  
                var shuffleElements = document.querySelectorAll("#shuffle");
  
                shuffleElements.forEach(function (shuffleElement) {
                  var saleverifyOuterElements =
                    shuffleElement.querySelectorAll(".saleverify-outer");
  
                  saleverifyOuterElements.forEach(function (saleverifyOuter) {
                    saleverifyOuter.classList.remove("ActiveNotify");
                    saleverifyOuter.style.cssText = "display: none !important";
                  });
                });
  
                setInterval(function () {
                  rotateNotification();
  
                  shuffleElements.forEach(function (shuffleElement) {
                    var saleverifyOuterElements =
                      shuffleElement.querySelectorAll(".saleverify-outer");
  
                    saleverifyOuterElements.forEach(function (saleverifyOuter) {
                      saleverifyOuter.classList.remove("ActiveNotify");
                      saleverifyOuter.style.cssText = "display: none !important";
                    });
  
                    var firstSaleVerifyOuter =
                      shuffleElement.querySelector(".saleverify-outer");
  
                    if (firstSaleVerifyOuter) {
                      firstSaleVerifyOuter.classList.add("ActiveNotify");
                      firstSaleVerifyOuter.style.cssText =
                        "display: block !important; opacity: 1 !important";
  
                      var activeNotifyElements =
                        document.querySelectorAll(".ActiveNotify");
  
                      activeNotifyElements.forEach(function (activeNotify) {
                        activeNotify.style.webkitAnimationPlayState = "running";
                        activeNotify.style.opacity = "1";
  
                        setTimeout(function () {
                          activeNotify.style.webkitAnimationPlayState = "paused";
                        }, 2000);
  
                        setTimeout(function () {
                          activeNotify.style.opacity = "0";
                        }, 5000);
                      });
                    }
                  });
                }, Math.floor(Math.random() * (max - min + 1) + min));
              }
            }, 1000);
          }
        }
      });
  
      // Scroll event listener to check if the video is in view
      window.addEventListener("scroll", function () {
        const videoRect = smartPlayerContainer.getBoundingClientRect();
        isVideoVisible =
          videoRect.top >= 0 &&
          videoRect.bottom <= window.innerHeight &&
          videoRect.left >= 0 &&
          videoRect.right <= window.innerWidth;
  
        // Check visibility on scroll
        checkVisibility();
      });
  
      // Detect tab switches
      window.addEventListener("blur", function () {
        hasTabSwitched = true;
        console.log("Tab switched True");
      });
  
      window.addEventListener("focus", function () {
        hasTabSwitched = false;
        console.log("Tab switched False");
      });
    });
  
    function checkVisibility() {
      const videoElement = smartPlayerContainer
        ? smartPlayerContainer.querySelector("video")
        : null;
  
        if (isVideoPlayed && !videoElement.paused) {
          maximizeVideo();
        } 
    }
  
    function maximizeVideo() {
      // Your code to maximize the video

      console.log("Maximize Video");
      // Start Maximize Video
      let videosection = document.querySelector("#video");
      let bodyselector = document.querySelector("body");
      let videocontainer = document.querySelector("#video > div");
      let videotop = document.querySelector("#video > div > div");
      let videoh3 = document.querySelector("#video > div > div > h3");
      let videoh1 = document.querySelector("#video > div > div > h1");
      let video = document.querySelector("#smartplayer");
      let smartvideowrap = document.querySelector(
        "#smartplayer > div > div.smartplayer-video-wrap"
      );
      let MainVidWrapper = document.querySelector("#vid-wrapper");
      let vidwrapper = document.querySelector("#smartplayer > div");
      let vidwrappervid = document.querySelector(
        "#smartplayer > div > div.smartplayer-video-wrap > video"
      );
      vidwrappervid.style.objectFit = "contain";
      video.style.display = "contents";

      // bodyselector.style.overflow = "hidden";
      // window.scrollTo({
      //   top: 0,
      //   behavior: "instant",
      // });


      if (window.innerWidth < 700) {
        videosection.style.height = "96vh";
        videosection.style.height = "96dvh";
        vidwrapper.style.height = "100vh";
        vidwrapper.style.height = "100dvh";
        video.style.position = "static";
        vidwrappervid.style.objectFit = "fill";
        vidwrappervid.style.background = "#000";
      } else {
        videocontainer.style.maxWidth = "100%";
        MainVidWrapper.style.width = "100%";
        MainVidWrapper.style.maxWidth = "100%";
        MainVidWrapper.style.position = "relative";
        MainVidWrapper.style.height = "100vh";
        videocontainer.style.padding = "0px";
        smartvideowrap.style.height = "100vh";
        vidwrapper.style.height = "100vh";
        vidwrappervid.style.background = "#000";
        videotop.style.marginTop = "0px !important";
        videoh3.style.display = "none";
        videoh1.style.display = "none";
      }
      // End Maximize Video
    }
  
    function minimizeVideo() {
      // Your code to minimize the video
      console.log("Minimize Video");
      // Start Minimize Video
      let bodyselector = document.querySelector("body");
      let videosection = document.querySelector("#video");
      let videocontainer = document.querySelector("#video > div");
      let MainVidWrapper = document.querySelector("#vid-wrapper");
      let videotop = document.querySelector("#video > div > div");
      let videoh3 = document.querySelector("#video > div > div > h3");
      let videoh1 = document.querySelector("#video > div > div > h1");
      let video = document.querySelector("#smartplayer");
      let vidwrapper = document.querySelector("#smartplayer > div");
      let vidwrappervid = document.querySelector(
        "#smartplayer > div > div.smartplayer-video-wrap > video"
      );
      let smartvideowrap = document.querySelector(
        "#smartplayer > div > div.smartplayer-video-wrap"
      );
      video.style.position = "relative";
      video.style.display = "block";

      bodyselector.style.overflow = "auto";

      if (window.innerWidth < 700) {
        videosection.style.height = "auto";
        vidwrapper.style.height = "auto";
        vidwrappervid.style.objectFit = "cover";
        video.style.background = "transparent";
        vidwrappervid.style.background = "transparent";
      } else {
        videocontainer.style.maxWidth = "initial";
        videocontainer.style.height = "auto";
        MainVidWrapper.style.height = "auto";
        MainVidWrapper.style.width = "100%";
        MainVidWrapper.style.maxWidth = "900px";
        MainVidWrapper.style.maxHeight = "none";
        MainVidWrapper.style.margin = "auto";
        MainVidWrapper.style.position = "relative";
        MainVidWrapper.style.top = "0px";
        MainVidWrapper.style.left = "0px";
        video.style.height = "auto";
        smartvideowrap.style.height = "auto";
        vidwrapper.style.height = "auto";
        vidwrappervid.style.objectFit = "cover";
        videotop.style.marginTop = "1rem !important";
        videoh3.style.display = "block";
        videoh1.style.display = "block";
      }
      // End Minimize Video
    }
  };
  
  setTimeout(function () {
    startWatchVideoProgress();
  }, 1000);
  
  if (checkVisit == "false") {
    document.getElementById("showsectiononrefresh").style.display = "none";
    document.getElementById("floating-button").style.opacity = "0";
    document.getElementById("shuffle").style.display = "none";
    imgElement1.style.display = "none";
    bluearrowd.style.display = "none";
    console.log("Have Not Watched the Video");
  }
  if (checkVisit == null) {
    document.getElementById("showsectiononrefresh").style.display = "none";
    document.getElementById("floating-button").style.opacity = "0";
    document.getElementById("shuffle").style.display = "none";
    imgElement1.style.display = "none";
    bluearrowd.style.display = "none";
    console.log("Initial Visit");
  }
  if (checkVisit === "true") {
    document.getElementById("showsectiononrefresh").style.display = "block";
    document.getElementById("floating-button").style.opacity = "1";
    document.getElementById("shuffle").style.display = "block";
    imgElement1.style.display = "block";
    bluearrowd.style.display = "block";
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
          var parent = document.querySelector("#shuffle");
          var divs = Array.from(parent.children);
          while (divs.length) {
            parent.append(
              divs.splice(Math.floor(Math.random() * divs.length), 1)[0]
            );
          }
        }
  
        var min = 15000;
        var max = 20000;
  
        var shuffleElements = document.querySelectorAll("#shuffle");
  
        shuffleElements.forEach(function (shuffleElement) {
          var saleverifyOuterElements =
            shuffleElement.querySelectorAll(".saleverify-outer");
  
          saleverifyOuterElements.forEach(function (saleverifyOuter) {
            saleverifyOuter.classList.remove("ActiveNotify");
            saleverifyOuter.style.cssText = "display: none !important";
          });
        });
  
        setInterval(function () {
          rotateNotification();
  
          shuffleElements.forEach(function (shuffleElement) {
            var saleverifyOuterElements =
              shuffleElement.querySelectorAll(".saleverify-outer");
  
            saleverifyOuterElements.forEach(function (saleverifyOuter) {
              saleverifyOuter.classList.remove("ActiveNotify");
              saleverifyOuter.style.cssText = "display: none !important";
            });
  
            var firstSaleVerifyOuter =
              shuffleElement.querySelector(".saleverify-outer");
  
            if (firstSaleVerifyOuter) {
              firstSaleVerifyOuter.classList.add("ActiveNotify");
              firstSaleVerifyOuter.style.cssText =
                "display: block !important; opacity: 1 !important";
  
              var activeNotifyElements =
                document.querySelectorAll(".ActiveNotify");
  
              activeNotifyElements.forEach(function (activeNotify) {
                activeNotify.style.webkitAnimationPlayState = "running";
                activeNotify.style.opacity = "1";
  
                setTimeout(function () {
                  activeNotify.style.webkitAnimationPlayState = "paused";
                }, 2000);
  
                setTimeout(function () {
                  activeNotify.style.opacity = "0";
                }, 5000);
              });
            }
          });
        }, Math.floor(Math.random() * (max - min + 1) + min));
      }
    }, 1000);
  }