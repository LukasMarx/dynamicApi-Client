import { Field } from './field';

export class CRUDPermission {
  role: string;
  create: boolean = false;
  read: boolean = false;
  update: boolean = false;
  delete: boolean = false;
  readAll?: boolean = false;
}

export class Type {
  projectId: string;
  name: string;
  fields: { [key: string]: Field };
  permissions: { [key: string]: CRUDPermission };
  requiresPublication: boolean;
}
