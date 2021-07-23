import p5 from 'p5';
import { ParticleSimulator } from './ParticleSimulator';

let simulator: ParticleSimulator

const s = (p: p5) => {


  p.setup = function () {
    let c = p.createCanvas(800, 800, p.WEBGL);
    c.parent("p5Container");
    simulator = new ParticleSimulator(p);
    simulator.setup();
  };

  p.draw = function () {
    simulator.draw();
  };
};

let myp5 = new p5(s);