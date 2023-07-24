import { Schema, model } from "mongoose";


const PERMISSION_SCHEMA = "permission";
/**
 *  Permission.
 */
interface IPermission {
  code: string;
  description: string;
}

/**
 * The truck schema.
 * @type {Schema<IPermission>}
 */
const permissionSchema = new Schema<IPermission>({
  code: { type: String },
  description: { type: String },
})

const Permission = model<IPermission>(PERMISSION_SCHEMA, permissionSchema);

export { permissionSchema, Permission, IPermission }