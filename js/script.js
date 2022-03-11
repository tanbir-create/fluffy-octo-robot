let audio = $("audio")[0];
let playIcon = $(".play-icon");
let lineIcon = $(".line-icon");



//EDIT
audio.src = astro.audio;

$('#astro-name').text(astro.name)
$('#astro-name-sticky').text(astro.name)
$('#rating').text(astro.rating)
$('#followers').text(astro.followers + 'k')
$('#served').text(astro.served + 'k')
$('#experience').text(astro.exp + 'k')
$('#astro-bio').text(astro.description)
 

if(!astro.audio) {
  
  $('#astro-audio').css('display', 'none')

}

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


/**Expndable Bio *******/


let text = $("#astro-bio"),
  h = text[0].scrollHeight,
  expanded = false;

if (h > 54) {
  text.addClass("fds");

  let p = `
            <div class="show-more">
                <span>Show more</span>
            </div>
    `;
  $("#bio-expandable").append(p);

  $("#bio-expandable").click(function (e) {
    if (!expanded) {
      $( this ).find( '.show-more span' ).text("Collapse");

      expanded = true;

      text.animate({ height: h }, 200,);
    } else {
      expanded = false;
      $( this ).find( '.show-more span' ).text("Show more");


      text.animate({ height: "54px" }, 200);
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

    ${review.followUpReview ? `
          <div>
            <p class="follow-time">Added ${review.followUpReviewTIme} later</p>
            <div class="review-text">
      
    ${review.followUpReview}
  </div>

          </div>
    ` : ''}

    ${review.astroFeedback ? `<div class="astro-feedback">          <p>Astrologers Feedback</p>
    ${review.astroFeedback}
  </div>` : ''}
  </div>
                    
    
    `

    $('#reviews').append(reviewDiv)
})


//let a = Array.from($('.users-rating img'))




/*  STICKY HEADER ***************  */
const aD = document.querySelector('#astro-details');
const sticky = document.querySelector('.sticky-header');
const observer = new IntersectionObserver(obCallback, {
  threshold: .25,
  rootMargin: '-20px'
});

function obCallback(payload) {
  if(payload[0].isIntersecting) {
    sticky.classList.remove('visible'); 
  }
  else {
    sticky.classList.add('visible');
  }
}

observer.observe(aD);

let currentActiveBtn;


$('.review-btn').click(function() {

  document.getElementById('reviews-section').scrollIntoView({behavior: "smooth"});
  changeActiveBtn('.review-btn')
})
$('.info-btn').click(function() {
  document.getElementById('medals-container').scrollIntoView({behavior: "smooth"});
  changeActiveBtn('.info-btn')

})
$('.posts-btn').click(function() {
  document.getElementById('posts-section').scrollIntoView({behavior: "smooth"});
  changeActiveBtn('.posts-btn')

})

function changeActiveBtn(that) {
  if(currentActiveBtn ){
        
    $(currentActiveBtn).removeClass('active-btn') 
  }
  currentActiveBtn = $(that)
  
  $(that).addClass('active-btn')  
}







//**************** */ POSTS  ************************ */


posts.forEach( post => {

  
  
  let { date, text, title, image, video, likes, isArticle, comments  } = post
 
  let postDiv = `
       <div class="post">

       <div class='post-author-meta'>  
            <div>
                <img src="images/astro-image.png" alt="">
              </div>
     
            <div>
                <p class="article-author">${astro.name} </p>
              </div> </div>
    
        <div>

                ${video ? `<div id="video-container">
                <video class="video"  src="${video}">
                
                </video>
                <div class="button buttons" style="height: 0px;">
                    <button class="play-pause" ></button> 
                </div>
                <div class="controls hide" id="controls">
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                    
                    <div class="buttons btns">
                        <button class="play-pause"></button>
                    </div>

                    <div id="time-remaining" > 
                    
                    </div>
                </div>
            </div>` : ''}

            ${image ? `<div>
            <img src="${image}" alt="">
        </div>` : ''}

        ${text? `<p class="article-p"> ${text} </p>`: ''}

        ${title ? `<p class="article-title"> ${title} </p>`: ''}

        ${isArticle ? `<a href="https://www.guruji.life">Click here to read full article</a>`: ''} 


        <p class="date">${date} </p>

        <div id="article-stats">
        <div >
            <div id="like-post" class="center article-btn">
                <img src="images/like-icon.svg" alt=""> 
            </div>
            <p>${likes}</p>
        </div>
        
      ${comments ? `
      
      <div >
          <div id="comment-post" class="center article-btn">
              <img src="images/comment.svg" alt="">
          
          </div>
          <p>${comments}</p>
      </div>
      `: ''}

        <div id="share-post " class="article-btn">
            <img src="images/share.svg" alt=""> 
        
        </div>
    </div>

       </div> 

       </div>

  
  `

  $('#post-container').append(postDiv)


} )






function redirect() {
  window.location.assign('https://www.guruji.life')
}











/* VIDEO SCRIPT*/


let video = document.querySelector('.video')


if(video) {
    let btn =  $('.play-pause')
    let t;
    let openFirst = true;
    $('.play-pause').click(function() {

        if(openFirst) {
            $('#controls').removeClass('hide');
            openFirst = false;
            $('.button button').fadeOut();

        }

        if(video.paused) {
            $('.button button').fadeOut();

            btn.removeClass('play')

            btn.addClass('pause')
            $('.button button').removeClass('pause')
            video.play();
            if(t){
                clearTimeout(t)
            }
            $('.controls').fadeIn();

            //$('.button button').fadeIn();
        }
        else {
            btn.removeClass('pause')
            btn.addClass('play')
            video.pause();
        }
    })

    $('#video-container').click(function() {

    
    
        
            
            $('.controls').fadeIn();
            //$('.button button').fadeIn();

            if(t){
                clearTimeout(t)
            }
            if(video.paused) {
                return;
            }

            t = setTimeout(() => {
                $('.controls').fadeOut();
                $('.button button').fadeOut();
            }, 3000);


    
    })


    video.addEventListener('timeupdate', function() {
        let progress = video.currentTime / video.duration;
        $('.progress').css('width', `${progress * 100 + '%'}`)
        let distance = video.duration - video.currentTime;
        
        let {mins, sec} = getTimeLeft(distance);


        $('#time-remaining').text(mins + ':' + sec)
    
    
    
        if(video.ended){

            if(t){
                clearInterval(t)
            }

            $('.controls').fadeIn();
            $('.button button').fadeIn();   
            btn.removeClass('pause')
            btn.addClass('play')      
            let {mins, sec} = getTimeLeft(video.duration);
            $('#time-remaining').text(mins + ':' + sec)
        }

    })

    $('.progress-bar').click(function(e) {
        var rt =  $('.progress-bar').outerWidth();
    
        var xPos = e.pageX - $(this).offset().left;
        $('.progress').css('width', xPos)
    


        video.currentTime = xPos *  (video.duration/rt)
    
    })

    video.addEventListener('loadedmetadata', function() {
        
        let {mins, sec} = getTimeLeft(video.duration);
        $('#time-remaining').text(mins + ':' + sec)

    });


    function getTimeLeft(distance) {
        let mins = Math.floor((distance % ( 60 * 60)) / ( 60));
        let seconds = Math.floor((distance % ( 60)));
        let sec = seconds < 10 ? '0' + seconds : seconds

        const obj = {
            mins,
            sec
        }
        return obj;
    }
}




/* collapsable post text,  TODO change into single function */

$(".article-p").each(function() {

  let text = $(this),
  h = text[0].scrollHeight,
  expanded = false;

if (h > 54) {
console.log(h)

  let p = `
            <div class="show-more">
                <span>Show more</span>
            </div>
    `;
  $(p).insertAfter(this)

  $(this).click(function (e) {
    if (!expanded) {
      $( this ).parent().find( '.show-more span' ).text("Collapse");
      expanded = true;

      text.animate({ height: h }, 200,);
    } else {
      expanded = false;
      $( this ).parent().find( '.show-more span' ).text("Show more");

      text.animate({ height: "54px" }, 200);
    }
  });
}

})