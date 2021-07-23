import { CartesianCoordinate } from "./CartesianCoordinate";
import P5 from 'p5';

export class SphericalCoordinate {

  private phi: number;
  private theta: number;
  private length: number;
  private p5: P5;

  constructor(_p5: P5, aPhi: number, aTheta: number, len: number) {
    this.phi = aPhi;
    this.theta = aTheta;
    this.length = len;
    this.p5 = _p5;
  }

  anglesEquals(other: SphericalCoordinate): boolean {
    return this.phi == other.phi && this.theta == other.theta;
  }


  getPhi(): number {
    return this.phi;
  }

  getTheta(): number {
    return this.theta;
  }

  getLength(): number {
    return this.length;
  }

  setPhi(aPhi: number): void {
    this.phi = aPhi % 360;
  }

  setTheta(aTheta: number): void {
    this.theta = aTheta % 360;
  }

  increasePhi(by: number): void {
    this.phi = (this.phi + by) % 360;
  }

  increaseTheta(by: number): void {
    this.theta = (this.theta + by) % 360;
  }

  getCartesian(): CartesianCoordinate {

    let rPhi = this.p5.radians(this.getPhi());
    let rTheta = this.p5.radians(this.getTheta());

    let xn = this.internalRound(this.p5.sin(rPhi) * this.p5.sin(rTheta) * this.getLength(), 4);
    let yn = this.internalRound(this.p5.cos(rPhi) * this.getLength(), 4);
    let zn = this.internalRound(this.p5.sin(rPhi) * this.p5.cos(rTheta) * this.getLength(), 4);
    return new CartesianCoordinate(this.p5,xn, yn, zn);
  }

  toString(msg : String) : String {
    return msg + " (" + this.internalRound(this.getPhi(), 4) + "," +
      this.internalRound(this.getTheta(), 4) + "," + this.internalRound(this.getLength(), 4) + ")";
  }

  internalRound(num : number, decimals : number) : number {
    let temp = num * this.p5.pow(10, decimals);
    return this.p5.round(temp) / this.p5.pow(10, decimals);
  }
}