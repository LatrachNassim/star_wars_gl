const city = {
    configuration: null,

    start: function (config) {
        //debug mode
        if (config.debug_mode == false) {
            console.log = function () { };
        }

        this.configuration = config;
        this.engine.init(config.engine);

        this.star_play.init(config.star_play);

        this.update();

        console.log('CITY is started!');
    },
    update: function () {
        requestAnimationFrame(city.update);

        if (city.configuration.debug_mode) city.engine.stats.begin();

        city.star_play.update();
        city.engine.update();

        if (city.configuration.debug_mode) city.engine.stats.end();
    }

};