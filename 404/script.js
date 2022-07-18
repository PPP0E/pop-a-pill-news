(function() {
    "use strict";
    let count = 0
    const whatwewant = ["/404/img/sesu404-01.png", "/404/img/sesu404-02.png", "/404/img/sesu404-01.png"]
    const items = [
        "/404/img/sesu9999-02.png",
        "/404/img/sesu9999-04.png",
        "/404/img/sesu9999-05.png",
        "/404/img/sesu9999-06.png",
        "/404/img/sesu9999-03.png",
        "/404/img/sesu9999-07.png",
        "/404/img/sesu9999-08.png",
        "/404/img/sesu9999-09.png",
        "/404/img/sesu9999-10.png",
        "/404/img/sesu9999-11.png",
        "/404/img/sesu9999-12.png",
        "/404/img/sesu9999-13.png"
    ];
    window.onload = function() {
        spin();
    };
    const doors = document.querySelectorAll(".door");
    async function spin() {
        init(false, 1, 2);
        for (const door of doors) {
            const boxes = door.querySelector(".boxes");
            const duration = parseInt(boxes.style.transitionDuration);
            boxes.style.transform = "translateY(0)";
            await new Promise((resolve) => setTimeout(resolve, duration * 100));
        }
    }

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function init(firstInit = true, groups = 1, duration = 1) {
        count = 0
        for (const door of doors) {
            if (firstInit) {
                door.dataset.spinned = "0";
            } else if (door.dataset.spinned === "1") {
                return;
            }

            const boxes = door.querySelector(".boxes");
            const boxesClone = boxes.cloneNode(false);

            const pool = ["/404/img/sesu9999-15.png"];
            if (!firstInit) {
                const arr = [];
                for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
                    arr.push(...items);
                }
                pool.push(...shuffle(items));
                pool.push(...fix(whatwewant));

                boxesClone.addEventListener(
                    "transitionstart",
                    function() {
                        door.dataset.spinned = "1";
                        this.querySelectorAll(".box").forEach((box) => {
                            box.style.filter = "blur(1px)";
                        });
                    }, { once: true }
                );

                boxesClone.addEventListener(
                    "transitionend",
                    function() {
                        this.querySelectorAll(".box").forEach((box, index) => {
                            box.style.filter = "blur(0)";
                            if (index > 0) this.removeChild(box);
                        });
                    }, { once: true }
                );
            }
            //console.log(pool);

            for (let i = pool.length - 1; i >= 0; i--) {
                const box = document.createElement("div");
                const img = document.createElement("img");
                img.classList.add("box")
                box.classList.add("box");
                box.style.width = door.clientWidth + "px";
                box.style.height = door.clientHeight + "px";
                box.textContent = pool[i];
                //console.log(...pool[i])
                img.src = pool[i];
                img.style.width = door.clientWidth + "px";
                img.style.height = box.style.height = door.clientHeight + "px";
                //boxesClone.appendChild(box);
                boxesClone.appendChild(img);
            }
            boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
            boxesClone.style.transform = `translateY(-${
        door.clientHeight * (pool.length - 1)
      }px)`;
            door.replaceChild(boxesClone, boxes);
            // console.log(door);
        }
    }

    function shuffle([...arr]) {
        let m = arr.length;
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr;
    }

    function fix([...arr]) {
        let random = randomIntFromInterval(0, 8)
        if (count >= whatwewant.length) {
            arr.push(items[random])
        } else {
            arr.push(whatwewant[count])
        }
        count++
        return arr;
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }



    init();
})();