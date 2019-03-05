// Defining a variable that keep track of object memeber by iterating
var i = 1;

// Object that stores song and image data
var data = {
  1: {
    title: "Justin Bieber - What Do You Mean?",
    song: "assets/songs/1. JB-wdym.mp3",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/JustinBieberWhatDoYouMeanCover.png/220px-JustinBieberWhatDoYouMeanCover.png"
  },
  2: {
    title: "Ariana Grande - Dangerous Woman",
    song: "assets/songs/2. AG-dw.mp3",
    image: "https://images-na.ssl-images-amazon.com/images/I/A1LRANDvjvL._SY355_.jpg"
  },
  3: {
    title: "Justin Bieber - Where Are You Now?",
    song: "assets/songs/3. JB-wayn.mp3",
    image: "https://sslf.ulximg.com/image/750x750/cover/1425018657_1e16d1abe8b29c1d32194542709ddaac.jpg/bed2d0e9f2e1f7e6561d7cf5b82ad5e5/1425018657_jack_u_album_cover1_58.jpg"
  },
  4: {
    title: "Selena Gomez - Fetish (ft. Gucci Mane)",
    song: "assets/songs/4. SG-f.mp3",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Fetish_%28featuring_Gucci_Mane%29_%28Official_Single_Cover%29_by_Selena_Gomez.png/220px-Fetish_%28featuring_Gucci_Mane%29_%28Official_Single_Cover%29_by_Selena_Gomez.png"
  },
  5: {
    title: "Taylor Swift - End Game",
    song: "assets/songs/5. TS-eg.mp3",
    image: "https://store.taylorswift.com/mm5/graphics/00000001/reputation_cd_550x550.jpg"
  }
};

// Animation when page loads
      $("#wrapper").addClass("magictime vanishIn");

// Defining button object with members as all buttons objects
      var button = {
            play: $("#play"),
            previous: $("#previous"),
            next: $("#next"),
            list: $("#list"),
            repeat: $("#repeat")
      };

// Creating an instance of the global Wavesurfer object
      var Spectrum = WaveSurfer.create({
          container: '#waveform',
          waveColor: '#c3073f',
          progressColor: 'hsla(200, 100%, 30%, 0.5)',
          cursorColor: '#000',
          // This parameter makes the waveform look like SoundCloud's player
          barWidth: 2
      });

// Function to load the default song and info
      function updateInfo(i) {
              Spectrum.load(data[i].song);
              $("img").attr("src", data[i].image);
              $("h1").html(data[i].title);
      };
      updateInfo(i);

// Defining necessary functions for icon changes
      function playToPauseIcon() {
            $("#headphones").css("color", "#1db954");
            if(button.play.hasClass("fal fa-play-circle")) {
              button.play.removeClass("fal fa-play-circle");
              button.play.addClass("fal fa-pause-circle");
            };
      };
      function pauseToPlayIcon() {
            $("#headphones").css("color", "rgb(255, 45, 85)");
            if(button.play.hasClass("fal fa-pause-circle")) {
              button.play.removeClass("fal fa-pause-circle");
              button.play.addClass("fal fa-play-circle");
            };
      };

// Handles the play button
      button.play.on("click", function() {
            // Check whether play is clicked or pause
            if($(this).hasClass("fal fa-pause-circle")) {
                Spectrum.pause();
                pauseToPlayIcon();

            } else {
                Spectrum.play();
                playToPauseIcon();
            };
      });

// Handles the next button
      button.next.on("click", function() {
            i++;
            if(!data[i]) {
                i = 1;
            }
      });

// Handles the previous button
      button.previous.on("click", function() {
            i--;
            if(!data[i]) {
                i = 5;
            }
      });

// When next or previous are clicked, the value of i from above next and previous click events runs the logic below
      $("#next, #previous").on("click", function() {
            updateInfo(i);
            Spectrum.on('ready', function () {
                Spectrum.play();
                playToPauseIcon();
            });

            $("#waveform").toggleClass("animated fadeInLeft");
            $("#waveform").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
              $("#waveform").removeClass("animated fadeInLeft");
            });
      });

// Change pause to play icon when song finishes (if not repeated.)
      Spectrum.on("finish", function() {
            Spectrum.stop();
            $("#headphones").css("color", "rgb(255, 45, 85)");
            pauseToPlayIcon();
      });

// Handles the repeat button
      button.repeat.on("click", function() {
            if($(this).hasClass("far fa-repeat-1")) {
              $(this).removeClass("far fa-repeat-1");
              $(this).addClass("fal fa-repeat");
              Spectrum.on("finish", function() {
                  Spectrum.stop();
                  pauseToPlayIcon();
              });

            } else {
              $(this).removeClass("fal fa-repeat");
              $(this).addClass("far fa-repeat-1");
              Spectrum.on("finish", function() {
                  Spectrum.play();
                  playToPauseIcon();
              });
            }
      });

// Handles the list button
      button.list.on("click", function() {
            $("#overlay").removeClass("animated bounceOutDown");
            $("#overlay").css("display", "block");
            $("#waveform").css("opacity", "0.5");

            $("#overlay").toggleClass("magictime slideDownReturn");
            $("#overlay").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
                  $("#overlay").removeClass("magictime slideDownReturn");
            });
      });

// // Handle the chevronDown icon in overlay song list
      $("#chevronDownIcon").on("click", function() {
            $("#overlay").toggleClass("animated bounceOutDown");
            $("#waveform").css("opacity", "1");

            setTimeout(function(){
                  $("#overlay").css("display", "none");
            }, 600);
      });

// Toggle animation on song list item
      $("ol").on("mouseover", "li", function() {
            $(this).css("cursor", "pointer");
            $(this).css("color", "black");
            $(this).toggleClass("animated pulse");
            $(this).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
            $(this).removeClass("animated pulse");
            });
      });
      $("ol").on("mouseout", "li", function() {
            $(this).css("color", "white");
      });

// Animate icons and image
      $("i").on("mouseover", function() {
            $(this).toggleClass("animated pulse");
            $(this).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
            $(this).removeClass("animated pulse");
            });
      });

      $("i").on("click", function() {
            $("img").toggleClass("animated pulse");
            $("#headphones").toggleClass("animated pulse");
            $("#headphones").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
              $(this).removeClass("animated pulse");
              $("img").removeClass("animated pulse");
            });
            $(this).toggleClass("animated zoomIn");
            $(this).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
              $(this).removeClass("animated zoomIn");
            });
      });

// Toggle shake animation on keypress
      $("html").on("keypress", function() {
            $("body").toggleClass("animated shake");
            $("body").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
            $(this).removeClass("animated shake");
            });
      });

// Volume Slider
       var volumeInput = document.querySelector('#volume');
       var onChangeVolume = function (e) {
            Spectrum.setVolume(e.target.value);
       };
       volumeInput.addEventListener('input', onChangeVolume);
       volumeInput.addEventListener('change', onChangeVolume);

// When Headphones are clicked make volume slider appear and disappear when clicked again
      $("#headphones").on("click", function() {
            $("#volume").toggleClass("volumeSelected");
            $("#volume").toggleClass("animated flipInY");
      });

// Loading songs list in the overlay songs list

// The for...in syntax lets you declare a variable which will be assigned the key of every property in an object, allowing you to iterate through all the keys in an object. The for...in loop is useful because you can’t loop through the properties stored in an object like you can an array. Object.keys(obj) servers a similar purpose which will return an array of all the values stored in the object.
// You can also compare to the for...of loop which is very similar but allows you to iterate through an array.
// The hasOwnProperty() method should be used to avoid iterating over inherited property.
      for(var prop in data) {
            if(data.hasOwnProperty(prop)) {
                $("<li>" + data[prop].title + "</li>").appendTo("ol");
            };
      }

// When song from songlist is clicked load it into waveform
      $("ol").on("click", "li", function() {
            for(var prop in data) {
                  if(data.hasOwnProperty(prop)) {
                        if(data[prop].title === this.innerHTML) {
                              i = prop;
                              updateInfo(i);
                              Spectrum.on('ready', function () {
                                  Spectrum.play();
                                  playToPauseIcon();
                              });
                        };
                  };
            };
            $(this).addClass("animated fadeIn");
            $(this).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
                  $(this).removeClass("animated fadeIn");
            });
      });
