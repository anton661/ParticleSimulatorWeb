import p5 from 'p5';
const s = (p) => {
    let x = 100;
    let y = 100;
    p.setup = function () {
        let c = p.createCanvas(200, 200);
        c.parent("p5Container");
    };
    p.draw = function () {
        p.console("Hurra");
        p.background(0);
        p.fill(255);
        p.rect(x, y, 50, 50);
        p.console("Hurra");
    };
};
let myp5 = new p5(s);
//# sourceMappingURL=ParticleSimulatorWeb.js.map