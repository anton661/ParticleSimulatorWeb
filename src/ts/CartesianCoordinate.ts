import P5 from 'p5';
import { SphericalCoordinate } from './SphericalCoordinate';

export class CartesianCoordinate {

  private coordinate: P5.Vector;
  private p5: P5;



  constructor(_p5: P5, x: number, y: number, z: number) {
    this.p5 = _p5;
    this.coordinate = this.p5.createVector(x, y, z);
  }

  clone(): CartesianCoordinate {
    return new CartesianCoordinate(this.p5, this.coordinate.x, this.coordinate.y, this.coordinate.z);
  }

  x(): number {
    return this.coordinate.x;
  }

  y(): number {
    return this.coordinate.y;
  }

  z(): number {
    return this.coordinate.z;
  }

  distTo0(): number {
    return this.p5.sqrt(this.p5.pow(this.x(), 2) + this.p5.pow(this.y(), 2) + this.p5.pow(this.z(), 2));
  }

  add(other: CartesianCoordinate): CartesianCoordinate {
    let temp = this.coordinate.add(other.coordinate);
    return new CartesianCoordinate(this.p5, temp.x, temp.y, temp.z);
  }

  getSpherical(other: CartesianCoordinate): SphericalCoordinate {

    let xd = this.internalRound(this.x() - other.x(), 4);
    let yd = this.internalRound(this.y() - other.y(), 4);
    let zd = this.internalRound(this.z() - other.z(), 4);
    let dist = this.p5.sqrt(this.p5.pow(xd, 2) + this.p5.pow(yd, 2) + this.p5.pow(zd, 2));


    let phiRad = this.p5.acos(yd / dist);
    let phiDeg = this.p5.degrees(phiRad);

    if (zd == 0) {
      zd = 0.00001;
    }
    let thetaRad = this.p5.atan(xd / zd);
    let thetaDeg = this.p5.degrees(thetaRad);

    return new SphericalCoordinate(this.p5, phiDeg, thetaDeg, dist);
  }


  toString(msg: String): String {
    return msg + " (" + this.internalRound(this.x(), 4) + "," +
      this.internalRound(this.y(), 4) + "," + this.internalRound(this.z(), 4) + ") => " + this.distTo0();
  }


  internalRound(num: number, decimals: number): number {
    let temp = num * this.p5.pow(10, decimals);
    return this.p5.round(temp) / this.p5.pow(10, decimals);
  }
}

