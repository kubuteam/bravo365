class Jackpot {
    constructor(selector) {
        this.selector = selector;

        this.loop();
    }

    loop() {
        let jackpots = document.querySelectorAll(this.selector);

        jackpots.forEach((item) => {
            let jackpot = item.querySelector('.jackpot__counter'),
                value = parseInt(jackpot.getAttribute(['data-jackpot'])),
                randomJackpotInt = this.randomInt(150, 650),
                randomIntervalInt = this.randomInt(1000, 2000),
                randomCentsInt = this.randomInt(10, 99);

            this.show(value, jackpot, randomJackpotInt, randomCentsInt);

            let interval = setInterval(() => {
                this.show(value, jackpot, randomJackpotInt, randomCentsInt);

                this.loop();

                clearInterval(interval);
            }, randomIntervalInt);
        })
    }

    show(value, jackpot, randomJackpotInt, randomCentsInt) {
        value += randomJackpotInt;

        let transformed = this.transform(value);

        jackpot.innerHTML = 'IDR ' + transformed + '.' + randomCentsInt;
        jackpot.setAttribute('data-jackpot', transformed.replace(/\,/g, ''));
    }

    transform(value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

(() => {
    console.clear();

    let jackpot = new Jackpot('.jackpot');
})()