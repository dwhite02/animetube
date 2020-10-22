var key = 'AIzaSyDrSsrlQ8D9aro_hQEdOBGK0RmIWGkIVno';

function fecthData (max, part, q, type) {
    return fetch('https://www.googleapis.com/youtube/v3/search?' + new URLSearchParams({
        "key": key,
        "maxResults": max,
        "part": part,
        "q": q ,
        "type": type
    }))
        .then(response => response.json())
}

const testVid = 
    {
        img: 'images/yu-yu.jpg',
        title: 'Yusuke VS Sensui FULL Fight [HD] | Yu Yu Hakusho ',
        desc: 'Yu Yu Hakusho is the property of Yoshihiro Togashi, Funimation Entertainment, and Fuji TV please support the official release.',
        id: 'jrwyT6sEhhY'
    }

//------ Video Resizing ----------//

const size = document.querySelector('ul')
if (window.innerWidth > 992 ) {
    document.querySelector('.demon').style.width = size.clientWidth / 4 + 'px'
} else if (window.innerWidth > 768) {
    document.querySelector('.demon').style.width = size.clientWidth / 3 + 'px'
} else if (window.innerWidth > 375) {
    document.querySelector('.demon').style.width = size.clientWidth / 2 + 'px'
} else {
    document.querySelector('.demon').style.width = size.clientWidth / 1 + 'px'
}


window.addEventListener('resize', function () {
    let boxes = document.querySelectorAll('.demon') 
    const size = document.querySelector('ul')
    for (const box of boxes) {
        if (window.innerWidth > 992) {
            box.style.width = size.clientWidth / 4 + 'px'
        } else if (window.innerWidth > 768) {
            box.style.width = size.clientWidth / 3 + 'px'
        } else if (window.innerWidth > 375) {
            box.style.width = size.clientWidth / 2 + 'px'
        } else {
            box.style.width = size.clientWidth / 1 + 'px'
        }
    }
})

//------ Button Active State ----------//
let selectedBox;

function highlight(node) {
    if (selectedBox) {
        selectedBox.classList.remove('active');
    }
    selectedBox = node;
    selectedBox.classList.add('active');
}

//------ Vue Instance ----------//

const vm = new Vue ({
    el: '#main-content',
    data: {
        videos: [],
        feat: testVid,
        playlists: [],
        playlists2: [],
        search: [],
        text: '',
        query: ''
    },
    methods: {
        changeSet: function (num) {
            const container = document.querySelector('ul');
            container.scrollLeft = container.clientWidth * num;
        },
        arrowSlide: function (num) {
            const container = document.querySelector('ul');
            let leftValue = container.clientWidth * num;

            //Jquery scroll used for crossed browsers (safari)
            $(container).animate({
                scrollLeft: `+=${leftValue}`
            }, 300, "swing"
            );
        },
        activeButton: function (event) {
            document.querySelector('span').classList.remove('active');
            let target = event.target;

            while (target != this) {
                if (target.tagName == 'SPAN') {
                    highlight(target);
                    return;
                }
                target = target.parentNode;
            }
        },
        getAnime: function () {
            fecthData(4, "snippet", this.query + ' anime', "video")
                .then(res => this.search = res.items) 

            this.text = this.query;
            this.query = '';
        },
        openModal: function (video) {
            $('body').toggleClass('overflow-hidden')
            //Add class="visible" to the element with ID 'modal'
            //This class will make the hidden modal on the screen appear
            $('#modal').addClass('visible');

            const iframeSrc = 'https://youtube.com/embed/' + video;

            //Create an iFrame that is linked to the embedded YouTube video in the element with the class 'modal-player'
            //If you look at YouTube and go to share a video, you get an <iframe> tag similar to what we create below
            $('.modal-player').html("<iframe src=" + iframeSrc + " width='506' height='315' frameborder='0' allowfullscreen></iframe>")

            
        }
    },
    created() {
        fecthData(12, "snippet", "Demon Slayer", "video")
            .then(res => this.videos = res.items)

        fecthData(10, "snippet", "Bleach", "playlist")
            .then(res => this.playlists = res.items)

        fecthData(10, "snippet", "My Hero Academia", "playlist")
            .then(res => this.playlists2 = res.items)
    }
})

//When the "X" button on the modal is clicked, run the following code
$('.modal-close').click(function (event) {
    event.preventDefault();

    $('body').toggleClass('overflow-hidden')

    //Remove the <iframe> tag from the page
    $('.modal-player').html("");

    //Remove the class="visible" to hide the modal again
    $('#modal').removeClass('visible');
    
})

const container = document.querySelector('ul');

container.addEventListener("scroll", showArrows);

function showArrows() {
    if (container.scrollLeft === 0) {
        document.querySelector('.arrow-l').style.display = 'none'
    } else {
        document.querySelector('.arrow-l').style.display = 'block'
    }
    if (container.scrollLeft === container.scrollWidth - container.clientWidth) {
        document.querySelector('.arrow-r').style.display = 'none'
    } else {
        document.querySelector('.arrow-r').style.display = 'block'
    }
}