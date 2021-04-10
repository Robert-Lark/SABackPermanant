// At its simplest, access control is either a yes or a no value depending on the users session info

import {permissionsList} from "./schemas/fields";
import {ListAccessArgs} from "./types";

export function isSignedIn({session}: ListAccessArgs) {
  // if session is undefined ie false is returned then the user is not signed in.
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({session}: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);
// Permission will check if a person has a specific permission in the roles of their user account.
export const permissions = {
  ...generatedPermissions,
  // here you can specify your own permission using the following format
  isAwesome({session}: ListAccessArgs) {
    if (session?.data.name.includes("Rob")) {
      return "True";
    }
    return "False";
  },
};

//rule based functions
//rules can return a boolean or a filter which limits which products they can CRUD
export const rules = {
  canManageProducts({session}: ListAccessArgs) {
    // 1. do they have the permission of canManageProduct
    if (permissions.canManageProducts({session})) {
      return true;
    }
    // 2. if not do they own this item?
    return {user: {id: session.itemId}};
  },
  canReadProducts({session}: ListAccessArgs) {
    if (permissions.canManageProducts({session})) {
      return true; //they can read everything
    }
    //otherwise they can only see available products (based on the status field of the product)
    return {status: "AVAILABLE"};
  },
};
