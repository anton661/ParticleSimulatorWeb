import P5 from 'p5';
import {CartesianCoordinate} from './CartesianCoordinate';
import { Interactable } from './Interactable';
import { SphericalCoordinate } from './SphericalCoordinate';
import { log } from './Utilities';

export class Boundry implements Interactable { //<>//

  private mass: number;
  private potConst: number;
  private ccCenter: CartesianCoordinate;
  private p5: P5;

  constructor(_p5: P5) {
    this.mass = 100;
    this.potConst = -5;
    this.p5 = _p5;
    this.ccCenter = new CartesianCoordinate(this.p5,0, 0, 0);  //center of sphere
  }


  draw(): void {
    this.p5.noFill();
    this.p5.stroke(this.p5.color(255, 0, 255));
    this.p5.circle(0, 0, this.p5.width);
  }d

  interactWith(other: Interactable): void {
  }

  getPosition(other: CartesianCoordinate): CartesianCoordinate {
    let sph = other.getSpherical(this.ccCenter);
    let ccPos = new SphericalCoordinate(this.p5, sph.getPhi(), sph.getTheta(), this.p5.width / 2).getCartesian();
    log(this.p5, ccPos.toString("the position of boundary") + " " + other.toString("  Particle = "));
    return ccPos;
  }

  getPotential(dist: number): number {
    let f = (this.mass * this.potConst) / this.p5.pow(dist, 2); 
    log(this.p5, "Potential from boundary = " + f + " at distance of " + dist);
    return f;
  }

  getName(): String {
    return "boundry";
  }

}

