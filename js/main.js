function link (path) {
    $(".blurb").fadeOut(300, function () {
        $(".blurb").load(path + " .blurb", function () {
            $(".blurb").fadeIn(300);
        });
    });
}
/* function mute () {
    document.getElementById('player').muted = !document.getElementById('player').muted;
} */
