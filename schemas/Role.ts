import {relationship, text} from "@keystone-next/fields";
import {list} from "@keystone-next/keystone/schema";
import { permissions } from "../access";
import { permissionFields } from "./fields";

export const Role = list({
    //This is where we specify who can create and define roles
    access: {
        create: permissions.canManageRoles,
        read: permissions.canManageRoles,
        update: permissions.canManageRoles,
        delete: permissions.canManageRoles,
    },
    // if you dont have permission to create and view roles then the UI will be different. 
    ui: {
hideCreate: args => !permissions.canManageRoles(args),
hideDelete: args => !permissions.canManageRoles(args),
isHidden: args => !permissions.canManageRoles(args)
    },
  fields: {
    name: text({isRequired: true}),
    // this copies and pastes the permissions from our permissions fields file
    // it allows them to be represented in the UI with Checkboxes. 
    ...permissionFields,
    assignedTo: relationship({
      //Remember, any time you make a relationship
      // you have to make a reference to it on the other item aswell.
      ref: "User.role",
      // many can have this specific role
      many: true,
      ui: {
        itemView: {fieldMode: "read"},
      },
    }),
  },
});
