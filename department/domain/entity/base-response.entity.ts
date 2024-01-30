import { SerializedErrorField } from "./serialized-error-field.entity";

export type BaseResponse = {
  success: boolean;
  message: string;
  errors?: SerializedErrorField;
};
