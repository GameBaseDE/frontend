/* tslint:disable */
export interface Exception  {

  /**
   * Detailed message of issue
   */
  details: string;

  /**
   * Short Exception code
   */
  exception: string;

  /**
   * ID of container causing this exception
   */
  id: string;
}
