import { checkbox } from '@keystone-next/fields';
//these are permission fields that the user may or may not be able to do
// This is where you would add roles like adding and editing blog posts etc
export const permissionFields = {
  canManageProducts: checkbox({
    defaultValue: false,
    label: 'User can Update and delete any product',
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'User can query other users',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'User can Edit other users',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User can CRUD roles',
  }),
  canManageCart: checkbox({
    defaultValue: false,
    label: 'User can see and manage cart and cart items',
  }),
  canManageOrders: checkbox({
    defaultValue: false,
    label: 'User can see and manage orders',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];