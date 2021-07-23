import { CartesianCoordinate } from './CartesianCoordinate';

export interface Interactable {

  interactWith( other : Interactable) : void;

   getPosition( other : CartesianCoordinate) : CartesianCoordinate;

  getPotential(distance : number) : number;

  getName() : String;

}