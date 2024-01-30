import { BaseResponse } from "../domain/entity";
import BaseCustomError from "./base-custom-error";

export class DepartmentNotFound extends BaseCustomError {
  private statusCode = 422;
  private defaultErrorMessage = "Department with provided id does not exist";

  constructor() {
    super("Department with provided id does not exist");
    Object.setPrototypeOf(this, DepartmentNotFound.prototype);
  }

  /**
   * Returns response status code for invalid input error.
   * @returns {number}
   */
  getStatusCode(): number {
    return this.statusCode;
  }

  /**
   * Returns serialized output for invalid input error.
   * @returns {BaseResponse}
   */
  serializeErrorOutput(): BaseResponse {
    return {
      success: false,
      message: this.defaultErrorMessage,
    };
  }
}
