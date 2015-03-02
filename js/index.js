//var Engine = famous.core.Engine;
//var Modifier = famous.core.Modifier;
//var Transform = famous.core.Transform;
//var Surface = famous.core.Surface;
//var StateModifier = famous.modifiers.StateModifier;

var app = {
    init: function() {
        var blinker = document.getElementsByName("body");
        var colors = ['#FF0000','#FF8800','#FFFF00','#8CFF00','#00FF15','#00FFAA','#0088FF',
                        '#0000FF','#8400FF','#FF00C3'];
        var index = 0;
        var run = false;

        document.addEventListener("click", function() {
            run = (run)? false: true;
        });

        setInterval(function() {
            if (run) {
                document.body.style.background = colors[index];
                index++
                if (index >= colors.length) {
                    index = 0;
                }
            }
        }, 20);






//        var mainContext = Engine.createContext();
//
//        var firstSurface = new Surface({
//            content: "<h3>Hi!</h3><p>I'm a surface!<br>I live inside a context.</p><p>You can add <b>HTML</b> content to me and style me with <b>CSS!</b></p>",
//            properties: {
//                backgroundColor: '#000000'
//            }
//        });
//        var stateModifier = new StateModifier({
//            backgroundColor: '#ffffff'
//        });
//
//
//        mainContext.add(stateModifier).add(firstSurface);
//console.log(Transform)
//        stateModifier.setTransform(
//            Transform.translate(0, 300, 0),
//            { duration : 1000, curve: 'linear' },
//            function() {
//                console.log("nextcolor")
//            }
//        );

        return this;
    }
}
window.onload = function() {
    app.init();
}