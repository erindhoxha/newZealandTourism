$(function () {
    setTimeout(function () {
        $('.nzt-container').fadeOut(500);
        $('.hide-everything').show();
    }, 2200);
});
var transpOrAcc = "";
var numberOfDays = "";
$(".alert").hide();
$('.btn-accomodation').on('click', function () {
    var transportOrAccommodation = $("#accom-or-transport").val();
    var peopleValue = $("#people-search").val().slice(0, 1);
    peopleValue = parseInt(peopleValue);
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    var firstDate = $("#datepicker").datepicker("getDate")
    var secondDate = $("#datepicker2").datepicker("getDate")
    if (firstDate == undefined || secondDate == undefined) {
        $(".alert").show();
    } else {
    numberOfDays = Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay));
    }
    if ($("#accom-or-transport").val() == "What do you need?") {
        $(".alert").show();
    }
    if (transportOrAccommodation == "Accommodation") {
    transpOrAcc = accommodation;
    } else {
    transpOrAcc = transport;
    }
    console.log(transportOrAccommodation)
    console.log(numberOfDays);
    console.log(peopleValue);


    if (numberOfDays > 15 || firstDate >= secondDate) {
        $(".alert").show(500);
        $(".line").hide(500);
    } else {
        // $('body').css('overflow', 'auto');
        $(".alert").hide(500);
        $(".line").show(500);
        $('html,body').animate({
                scrollTop: $(".container-result").offset().top
            },
            'slow');
    }
    
    if (transportOrAccommodation == "Accommodation") {
        $("#card-container").empty();
        var info = document.getElementById('summative-template').innerHTML;
        var template = Handlebars.compile(info);
        var dataTemplate = template(accommodation);
        var templateWrite = document.getElementById('card-container').innerHTML += dataTemplate;
        $(".fuel").hide();
        var answerData = accommodation;
        
    } else if (transportOrAccommodation == "Transport") {
        $("#card-container").empty();
        var info = document.getElementById('summative-template').innerHTML;
        var template = Handlebars.compile(info);
        var dataTemplate = template(transport);
        var templateWrite = document.getElementById('card-container').innerHTML += dataTemplate;
        $(".meals").hide();
        var answerData = transport;
    }

    // FILTER THE CARDS - ADD THE CLASSES WHICH IS APPROPRIATE .daysd + .peoplep + card-wrap
    function doFiltering() {
        $(".card-wrap").hide();
        $(".card-wrap." + numberOfDays + "d." + peopleValue + "p").show();
    }
    doFiltering();


    $(".btn-book").on('click', function () {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        $("#datepicker2").on('change', function () {

            $(".price-modal").text('Price: $' + answerData.types[dataNr].price * numberOfDays);
        });

        $(".modal-body").css('text-align', 'center');
        $(".rating-container").empty();
        console.log($(this).closest(".card-wrapper").attr('data-nr'));
        var dataNr = $(this).closest(".card-wrapper").attr('data-nr');
        $("#theModal").attr('data-nr', dataNr);
        for (var i = 0; i < answerData.types[dataNr].images.length; i++) {
            $(".image-" + i).attr('src', "img/" + answerData.types[dataNr].images[i]);
        }
        $(".fuel-price").text(answerData.types[dataNr].approxFuelSpend);
        $(".price-modal").text('Price: $' + answerData.types[dataNr].price + " x " + numberOfDays + " days = $" + answerData.types[dataNr].price * numberOfDays);
        $(".modal-title").text(answerData.types[dataNr].name);
        $(".modal-description").text(answerData.types[dataNr].description);
        $(".card-wrapper").find($(".rating")[dataNr]).clone().appendTo(".rating-container");
        $(".modal-body .rating").addClass("modal-rating");
        $(".modal-body .rating").removeClass("rating");
        $(".modal-body .modal-rating .btn-review-modal").addClass('btn-review-modal-new');
        $(".modal-body .modal-rating .btn-review-modal").removeClass('btn-review-modal');
        if (answerData == accommodation) {
            $(".fuel-usage").text("");
            $(".fuel-usage").text(answerData.types[dataNr].people + " ");
            $(".fuel-usage").append('<i class="fas fa-user"></i>');
        for (var i = 0; i < $(".meals").length; i++) {
            $(".meals-image-" + i).attr('src', answerData.types[dataNr].mealsImage[i]);
         }
        }
        if (answerData == transport) {
        $(".fuel-usage").text(answerData.types[dataNr].fuel);
        }
        $(".special-modal").text(answerData.types[dataNr].value);
        if ($(".special-modal").text() == "") {
            $(".special-modal").hide();
        }
            console.log($(this).closest(".card-wrapper").attr('data-nr'));
            var dataNr = $(this).closest(".card-wrapper").attr('data-nr');
            for (var i = 0; i < $(".review").length; i++) {
                $(".review-" + i + "-text").text(answerData.types[dataNr].reviews[i]);
            }
            $(".modal-review-title").text(answerData.types[dataNr].name);

            $(".btn-exit").on('click', function() {
                $('#theModal').modal('hide');
            });
    })

        $(".btn-review-modal").on('click', function () {
            console.log($(this).closest(".card-wrapper").attr('data-nr'));
            var dataNr = $(this).closest(".card-wrapper").attr('data-nr');
            for (var i = 0; i < $(".review").length; i++) {
                $(".review-" + i + "-text").text(answerData.types[dataNr].reviews[i]);
            }
            $(".modal-review-title").text(answerData.types[dataNr].name);
        })
});

/* Demo purposes only */
$(".hover").mouseleave(
    function () {
        $(this).removeClass("hover");
    }
);
/*
Reference: http://jsfiddle.net/BB3JK/47/
*/

$('select').each(function () {
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function () {
            $(this).removeClass('active').next('ul.select-options').hide();
            $(".z__index").toggleClass('z___index');
            $(".z__index").css('z-index', '0');
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
        $(".z__index").toggleClass('z___index');
    });

    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide(500);
        //console.log($this.val());
    });

    $(document).click(function () {
        $styledSelect.removeClass('active');
        $(".z__index").removeClass('z___index');
        $list.hide(500);
    });

});




$(document).ready(function () {
    // hide .navbar first
    $(".follow-up-input").hide();
    // fade in .navbar
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 3000) {
                $('.follow-up-input').fadeOut();
            }
            // set distance user needs to scroll before we start fadeIn
            else if ($(this).scrollTop() > 500) {
                $('.follow-up-input').fadeIn();
            } else {
                $('.follow-up-input').fadeOut();
            }
        });
    });

});


/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        $("#follow-up-input").css('top', '0px');
        document.getElementById("follow-up-input").style.transition = "0.3s ease";
    } else {
        $("#follow-up-input").css('top', '-60px');
    }
    prevScrollpos = currentScrollPos;
}
$(".reload").on('click', function () {
    location.reload();
})
$(".close-btn").on('click', function () {
    $(".chat-popup").hide(500);
})

$(function () {
    $("#datepicker").datepicker();
});

$(function () {
    $("#datepicker2").datepicker();
});

var dateToday = new Date();

$("#datepicker").datepicker({
    dateFormat: 'dd-mm-yy',
    minDate: dateToday
});
$("#datepicker2").datepicker({
    dateFormat: 'dd-mm-yy',
    minDate: dateToday
});


$(document).on('resize, ready', function () {
    // Add class if screen size equals
    var $window = $(window),
        $navbar = $('#navbar-lg');

    function resize() {

        if ($window.width() < 768) {
            scrollWindow();
            return $navbar.attr('id', 'navbar');
            /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
        } else if ($window.width() > 768) {
            return $navbar.attr('id', 'navbar-lg');
        }
    }
    $window.resize(resize).trigger('resize');
});

function scrollWindow() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0px";
            document.getElementById("navbar").style.transition = "0.3s ease";
        } else {
            document.getElementById("navbar").style.top = "-57px";
        }
        prevScrollpos = currentScrollPos;
    }
}

var types = "";
$(".btn-sort-lowest").on('click', function () {
        types = transpOrAcc.types.sort(function (a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });
        var nearResult = { types };
        $("#card-container").empty();       
        var info = document.getElementById('summative-template').innerHTML;
        var template = Handlebars.compile(info);
        var dataTemplate = template(nearResult);
        var templateWrite = document.getElementById('card-container').innerHTML += dataTemplate;


        // MODAL FOR LOWEST

        $(".btn-book").on('click', function () {
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            $("#datepicker2").on('change', function () {
        
                $(".price-modal").text('Price: $' + transpOrAcc.types[dataNr].price * numberOfDays);
            });
        
            $(".modal-body").css('text-align', 'center');
            $(".rating-container").empty();
            console.log($(this).closest(".card-wrapper").attr('data-nr'));
            var dataNr = $(this).closest(".card-wrapper").attr('data-nr');
            $("#theModal").attr('data-nr', dataNr);
            for (var i = 0; i < transpOrAcc.types[dataNr].images.length; i++) {
                $(".image-" + i).attr('src', "img/" + transpOrAcc.types[dataNr].images[i]);
            }
            $(".fuel-price").text(transpOrAcc.types.fuel);
            $(".price-modal").text('Price: $' + transpOrAcc.types[dataNr].price + " x " + numberOfDays + " days = $" + transpOrAcc.types[dataNr].price * numberOfDays);
            $(".modal-title").text(transpOrAcc.types[dataNr].name);
            $(".modal-description").text(transpOrAcc.types[dataNr].description);
            $(".card-wrapper").find($(".rating")[dataNr]).clone().appendTo(".rating-container");
            $(".modal-body .rating").addClass("modal-rating");
            $(".modal-body .rating").removeClass("rating");
            $(".modal-body .modal-rating .btn-review-modal").addClass('btn-review-modal-new');
            $(".modal-body .modal-rating .btn-review-modal").removeClass('btn-review-modal');

            if (transpOrAcc == accommodation) {
                $(".fuel-usage").text("");
                $(".fuel-usage").text(transpOrAcc.types[dataNr].people + " ");
                $(".fuel-usage").append('<i class="fas fa-user"></i>');
            for (var i = 0; i < $(".meals").length; i++) {
                $(".meals-image-" + i).attr('src', transpOrAcc.types[dataNr].mealsImage[i]);
             }
            }

            
            if (transpOrAcc == transport) {
            $(".fuel-usage").text(transpOrAcc.types[dataNr].fuel);
            }
            $(".special-modal").text(transpOrAcc.types[dataNr].value);
            if ($(".special-modal").text() == "") {
                $(".special-modal").hide();
            }

                console.log($(this).closest(".card-wrapper").attr('data-nr'));
                var dataNr = $(this).closest(".card-wrapper").attr('data-nr');
                for (var i = 0; i < $(".review").length; i++) {
                    $(".review-" + i + "-text").text(transpOrAcc.types[dataNr].reviews[i]);
                }
                $(".modal-review-title").text(transpOrAcc.types[dataNr].name);

                $(".btn-exit").on('click', function() {
                    $('#theModal').modal('hide');
                });
        })
        
            $(".btn-review-modal").on('click', function () {
                console.log($(this).closest(".card-wrapper").attr('data-nr'));
                var dataNr = $(this).closest(".card-wrapper").attr('data-nr');
                for (var i = 0; i < $(".review").length; i++) {
                    $(".review-" + i + "-text").text(transpOrAcc.types[dataNr].reviews[i]);
                }   $(".modal-review-title").text(transpOrAcc.types[dataNr].name);
            })
        // MODAL FOR LOWEST
             
})

$(".btn-sort-highest").on('click', function () {
    types = transpOrAcc.types.sort(function (a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
    });
    var nearResult = { types };
    $("#card-container").empty();       
    var info = document.getElementById('summative-template').innerHTML;
    var template = Handlebars.compile(info);
    var dataTemplate = template(nearResult);
    var templateWrite = document.getElementById('card-container').innerHTML += dataTemplate;

    
})

$(".btn-sort-alphabetically").on('click', function () {
    types = transpOrAcc.types.sort(function (a, b) {
        return parseFloat(b.checked.length) - parseFloat(a.checked.length);
    });
    var nearResult = { types };
    $("#card-container").empty();       
    var info = document.getElementById('summative-template').innerHTML;
    var template = Handlebars.compile(info);
    var dataTemplate = template(nearResult);
    var templateWrite = document.getElementById('card-container').innerHTML += dataTemplate;
})



