import { Interactable } from './Interactable';
import { CartesianCoordinate } from './CartesianCoordinate';
import P5 from 'p5';
import { SphericalCoordinate } from './SphericalCoordinate';
import { log } from './Utilities';

export class Particle implements Interactable {

  private mass: number;
  private pos: CartesianCoordinate;
  private direction: SphericalCoordinate;
  private potConst: number;
  private movementArray: Array<CartesianCoordinate>;
  private name: String;
  private col: P5.Color;
  private p5: P5;


  constructor(_p5: P5, p: CartesianCoordinate, d: SphericalCoordinate, m: number, n: String, c: P5.Color) {
    this.mass = m;
    this.pos = p;
    this.direction = d;
    this.name = n;
    this.potConst = -0.1;
    this.col = c;
    this.movementArray = new Array<CartesianCoordinate>(0);
    this.p5 = _p5;
  }


  draw(): void {
    let beforePos = this.pos.clone();
    log(this.p5, beforePos.toString("vor Move: "));
    this.move();
    this.p5.fill(this.col);
    this.p5.noStroke();
    this.p5.circle(this.pos.x(), this.pos.y(), 5);
    log(this.p5, this.pos.toString("nach Move: "));
    log(this.p5, "differenz Move: xd = " + (this.pos.x() - beforePos.x()));
    log(this.p5, "");
  }

  private move(): void {

    let mVector = this.direction.getCartesian();
    this.movementArray.push(mVector);

    let ccPos = this.pos.clone();
    for (let i = 0; i < this.movementArray.length; i++) {
      this.pos.add(this.movementArray[i]);
    }

    let sphBetween = this.pos.getSpherical(ccPos);
    this.direction.setPhi(sphBetween.getPhi() == 0 ? this.direction.getPhi() :
      sphBetween.getPhi());
    this.direction.setTheta(sphBetween.getTheta() == 0 ? this.direction.getTheta() :
      sphBetween.getTheta());

    this.movementArray = new Array<CartesianCoordinate>(0);
  }

  public interactWith(other: Interactable): void {

    let spherical =
      other.getPosition(this.pos).getSpherical(this.pos);
    let dist = spherical.getLength();
    let phi = spherical.getPhi();
    let theta = spherical.getTheta();
    let force = this.mass * other.getPotential(dist);

    let sphMoveTo = new SphericalCoordinate(this.p5, phi, theta, force);
    let ccMoveTo = sphMoveTo.getCartesian();

    log(this.p5, ccMoveTo.toString("Moving to from interaction :") + "  " + sphMoveTo.toString(" SPH move to= ") + ccMoveTo.toString(" CC move to= "));

    this.movementArray = this.p5.append(this.movementArray, ccMoveTo);
  }

  public getPosition(other: CartesianCoordinate): CartesianCoordinate {
    return this.pos;
  }

  public getPotential(dist: number): number {
    return (this.mass * this.potConst) / this.p5.pow(dist, 2);
  }

  public getName(): String {
    return this.name;
  }

  public toString(): String {
    return "Particle " + this.name + " moving to direction (" +
      this.direction.toString("") + ") = (" + this.pos.toString("") + ")";
  }
}



