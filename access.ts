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
      // these next three lines should live in every rule
      // they will throw an error if the user is not signed in. 
    if (!isSignedIn({session})) {
        return false;
      }
    // 1. do they have the permission of canManageProduct
    if (permissions.canManageProducts({session})) {
      return true;
    }
    // 2. if not do they own this item?
    return {user: {id: session.itemId}};
  },
  canOrder({session}: ListAccessArgs) {
    if (!isSignedIn({session})) {
      return false;
    }
    // 1. do they have the permission of canOrderProduct
    if (permissions.canManageCart({session})) {
      return true;
    }
    // 2. if not do they own this item?
    return {user: {id: session.itemId}};
  },
  canManageOrderItems({session}: ListAccessArgs) {
    if (!isSignedIn({session})) {
        return false;
      }
    // 1. do they have the permission of canOrderProduct
    if (permissions.canManageCart({session})) {
      return true;
    }
    // 2. if not do they own this item?
    return {order: {user: {id: session.itemId}}};
  },
  canReadProducts({session}: ListAccessArgs) {
    if (!isSignedIn({session})) {
        return false;
      }
    if (permissions.canManageProducts({session})) {
      return true; //they can read everything
    }
    //otherwise they can only see available products (based on the status field of the product)
    return {status: "AVAILABLE"};
  },
  canManageUsers({session}: ListAccessArgs) {
    if (!isSignedIn({session})) {
      return false;
    }
    // 1. do they have the permission of canManageUsers (do you want them to be able to
    // change the roles of users)
    if (permissions.canManageUsers({session})) {
      return true;
    }
    // 2. otherwise they may only update themselves. 
    return {id: session.itemId};
  },
};
