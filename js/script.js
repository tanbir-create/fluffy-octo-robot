let audio = $("audio")[0];
let playIcon = $(".play-icon");
let lineIcon = $(".line-icon");

//EDIT
audio.src = "images/M83 - Outro.mp3";

if (audio) {
  $("audio").on("loadedmetadata", function () {
    let { mins, sec } = getTimeLeft(audio.duration);
    $(".time").text(mins + ":" + sec + "'");

    audio.addEventListener("timeupdate", function () {
      let distance = audio.duration - audio.currentTime;

      let { mins, sec } = getTimeLeft(distance);

      $(".time").text(mins + ":" + sec + "'");

      if (audio.ended) {
        playIcon.css("background-image", "url('images/play.svg')");
        lineIcon.css("animation-play-state", "paused");
        let { mins, sec } = getTimeLeft(audio.duration);
        $(".time").text(mins + ":" + sec + "'");
      }
    });
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


/**Expndable Bio */
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

$(".expand-image img").click(function () {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    const rfs =
      this.requestFullscreen ||
      this.webkitRequestFullScreen ||
      this.mozRequestFullScreen ||
      this.msRequestFullscreen;

    rfs.call(this);
  }
});

/**  REVIEWS */
//Get data from API instead
let { five, four, three, two, one, total } = reviews

let AR = (1*one+2*two+3*three+4*four+5*five)/total

$('#review-score').text(AR.toFixed(2))
$('#total-re').text(total.toLocaleString() + ' Total')

let fiveStar = $("#five"),
  fourStar = $("#four"),
  threeStar = $("#three"),
  twoStar = $("#two"),
  oneStar = $("#one");

fiveStar.css("width", `${calcWidth(total, five) + "%"}`);
fourStar.css("width", `${calcWidth(total, four) + "%"}`);
threeStar.css("width", `${calcWidth(total, three) + "%"}`);
twoStar.css("width", `${calcWidth(total, two) + "%"}`);
oneStar.css("width", `${calcWidth(total, one) + "%"}`);

function calcWidth(total, curr) {
  return ((curr / total) * 100);
}



//loop all reviews and append to container

userReview.forEach((review, index) => {
    let reviewDiv = `
    

    <div class="review">
    <div class="reviewer-data">
      <div>
        ${review.image? `<div class = "reviewer-image">
        <img src="${review.image}" alt="${review.username}" />
      </div>` : ''}
        <div>
          <p class="user-name">${review.username}</p>
          <p class="review-time">${review.date}</p>
        </div>
      </div>

      <div class="users-rating">
      
        <img src="images/star-${review.stars>=1? '': 'in'}active.svg" alt="" />
        <img src="images/star-${review.stars>=2 ? '': 'in'}active.svg" alt="" />
        <img src="images/star-${review.stars>=3 ? '': 'in'}active.svg" alt="" />
        <img src="images/star-${review.stars>=4 ? '': 'in'}active.svg" alt="" />
        <img src="images/star-${review.stars>=5 ? '': 'in'}active.svg" alt="" />
      </div>
    </div>

    <div class="review-text">
      
      ${review.review}
    </div>

    ${review.astroFeedback ? `<div class="astro-feedback">          <p>Astrologers Feedback</p>
    ${review.astroFeedback}
  </div>` : ''}
  </div>
                    
    
    `

    $('#reviews').append(reviewDiv)
})


//let a = Array.from($('.users-rating img'))








