import P5 from 'p5';
import { Particle } from './Particle';
import { Boundry } from './Boundry';
import { SphericalCoordinate } from './SphericalCoordinate';
import { CartesianCoordinate } from './CartesianCoordinate';

export class ParticleSimulator {
  RED: P5.Color;
  BLUE: P5.Color;
  GREEN: P5.Color;
  REDBLUE: P5.Color;
  REDGREEN: P5.Color;
  GREENBLUE: P5.Color;
  WHITE: P5.Color;


  particles: Array<Particle>;
  pa1: Particle;
  pa2: Particle;
  pa3: Particle;
  pa4: Particle;
  pa5: Particle;
  pa6: Particle;
  pa7: Particle;

  b: Boundry;

  p5: P5;

  spcEye: SphericalCoordinate;

  constructor(_p5: P5) {
    this.p5 = _p5;
    this.RED = this.p5.color(255, 0, 0);
    this.BLUE = this.p5.color(0, 0, 255);
    this.GREEN = this.p5.color(0, 255, 0);
    this.REDBLUE = this.p5.color(255, 0, 255);
    this.REDGREEN = this.p5.color(255, 255, 0);
    this.GREENBLUE = this.p5.color(0, 255, 255);
    this.WHITE = this.p5.color(255, 255, 255);

    this.b = new Boundry(this.p5);
    this.spcEye = new SphericalCoordinate(this.p5, 90, 0, 700);

    this.pa1 = new Particle(this.p5, new CartesianCoordinate(this.p5, 0, 0, 0), new SphericalCoordinate(this.p5, 45, 90, 2), 100, "p1", this.RED);
    this.pa2 = new Particle(this.p5, new CartesianCoordinate(this.p5, 250, 250, 0), new SphericalCoordinate(this.p5, 135, 90, -2), 100, "p2", this.BLUE);
    this.pa3 = new Particle(this.p5, new CartesianCoordinate(this.p5, 430, 40, 0), new SphericalCoordinate(this.p5, 90, 0, 2), 100, "p3", this.GREEN);
    this.pa4 = new Particle(this.p5, new CartesianCoordinate(this.p5, 410, 470, 0), new SphericalCoordinate(this.p5, 89, 0, 2), 100, "p4", this.REDBLUE);
    this.pa5 = new Particle(this.p5, new CartesianCoordinate(this.p5, 200, 200, 0), new SphericalCoordinate(this.p5, 225, 0, 2), 100, "p5", this.REDGREEN);
    this.pa6 = new Particle(this.p5, new CartesianCoordinate(this.p5, 330, 430, 0), new SphericalCoordinate(this.p5, 190, 0, 2), 100, "p6", this.GREENBLUE);
    this.pa7 = new Particle(this.p5, new CartesianCoordinate(this.p5, 430, 240, 0), new SphericalCoordinate(this.p5, 290, 0, 2), 100, "p7", this.WHITE);
    this.particles = new Array<Particle>(0);

    this.particles.push(this.pa1);
    this.particles.push(this.pa2);
//    this.particles.push(this.pa3);
//    this.particles.push(this.pa4);
//    this.particles.push(this.pa5);
//    this.particles.push(this.pa6);
//    this.particles.push(this.pa7);

  }




  setup(): void {
//    localStorage.clear();
  }


  draw(): void {
    this.p5.background(0);
    let eye = this.spcEye.getCartesian();
    this.p5.camera(eye.x(), eye.y(), eye.z(), 0, 0, 0, 0, 1, 0);

//    this.drawCoordinateSystem();
    this.b.draw();

    for (let i1 = 0; i1 < this.particles.length - 1; i1++) {
      let p1 = this.particles[i1];
      for (let i2 = i1 + 1; i2 < this.particles.length; i2++) {
        let p2 = this.particles[i2];
        p1.interactWith(p2);
      }
    }

    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.interactWith(this.b);
    }


    for (let part of this.particles) {
      part.draw();
    }

  }





  drawCoordinateSystem(): void {
    this.p5.textSize(12);

    let xSphLeft = new SphericalCoordinate(this.p5, 90, 90, this.p5.width / 2);
    let xSphRight = new SphericalCoordinate(this.p5, 90, 270, this.p5.width / 2);
    let xCarLeft = xSphLeft.getCartesian();
    let xCarRight = xSphRight.getCartesian();
    this.p5.stroke(this.p5.color(255, 0, 0));
    this.p5.line(xCarLeft.x(), xCarLeft.y(), xCarLeft.z(), xCarRight.x(),
      xCarRight.y(), xCarRight.z());

    let ySphTop = new SphericalCoordinate(this.p5, 180, 90, this.p5.width / 2);
    let ySphBot = new SphericalCoordinate(this.p5, 0, 90, this.p5.width / 2);
    let yCarTop = ySphTop.getCartesian();
    let yCarBot = ySphBot.getCartesian();
    this.p5.stroke(this.p5.color(0, 255, 0));
    this.p5.line(yCarTop.x(), yCarTop.y(), yCarTop.z(), yCarBot.x(), yCarBot.y(), yCarBot.z());

    this.p5.stroke(this.p5.color(0, 0, 255));
    let zSphFront = new SphericalCoordinate(this.p5, 90, 0, this.p5.width / 2);
    let zSphBack = new SphericalCoordinate(this.p5, 270, 0, this.p5.width / 2);
    let zCarFront = zSphFront.getCartesian();
    let zCarBack = zSphBack.getCartesian();
    this.p5.line(zCarFront.x(), zCarFront.y(), zCarFront.z(), zCarBack.x(), zCarBack.y(), zCarBack.z());
  }

}