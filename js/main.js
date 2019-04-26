function link (path) {
    $(".container").fadeOut(300, function () {
        $(".loading").fadeIn(150);
        $(".container").load(path + " .blurb", function () {
            $(".loading").fadeOut(150);
            $(".container").fadeIn(150);
            p = path.replace("index.html", "");
            history.pushState(p, p, p);
        });
    });
}
