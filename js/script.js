let audio = $("audio")[0];
let playIcon = $(".play-icon");
let lineIcon = $(".line-icon");

//EDIT
audio.src = "images/M83 - Outro.mp3";

if (audio) {
  $("audio").on("loadedmetadata", function () {
    let { mins, sec } = getTimeLeft(audio.duration);
    $(".time").text(mins + ":" + sec + "'");
  });

  $("#astro-audio").click(function () {
    if (audio.paused) {
      audio.play();
      playIcon.css("background-image", "url('images/pause.svg')");
      lineIcon.css("animation-play-state", "running");
      return;
    }

    audio.pause();
    playIcon.css("background-image", "url('images/play.svg')");
    lineIcon.css("animation-play-state", "paused");
  });

  audio.addEventListener("timeupdate", function () {
    let distance = audio.duration - audio.currentTime;

    let { mins, sec } = getTimeLeft(distance);

    $(".time").text(mins + ":" + sec + "'");

    if (audio.ended) {
      playIcon.css("background-image", "url('images/play.svg')");
      lineIcon.css("animation-play-state", "paused");
      let { mins, sec } = getTimeLeft(audio.duration);
      $(".time").text(mins + ":" + sec);
    }
  });

  function getTimeLeft(distance) {
    let mins = Math.floor((distance % (60 * 60)) / 60);
    let seconds = Math.floor(distance % 60);
    let sec = seconds < 10 ? "0" + seconds : seconds;

    const obj = {
      mins,
      sec,
    };
    return obj;
  }
}



let text = $("#astro-bio"),
  h = text[0].scrollHeight,
  expanded = false;

if (h > 54) {
  text.addClass("fds");

  let p = `
            <div id="show-more">
                <span>Show more</span>
            </div>
    `;
  $("#bio-expandable").append(p);
  
  $("#bio-expandable").click(function (e) {
    if (!expanded) {
      $("#show-more span").text("Show less");
      expanded = true;
  
      text.animate({ height: h });
    } else {
      expanded = false;
      $("#show-more span").text("Show more");
  
      text.animate({ height: "54px" });
    }
  });
}



$('.expand-image').click(function() {
    if($(this).hasClass('boro')){
        $(this).removeClass('boro')
        $(this).children('img').removeClass('abar-boro')
        return
    }

    $(this).addClass('boro')
    $(this).children('img').addClass('abar-boro')


    
})

