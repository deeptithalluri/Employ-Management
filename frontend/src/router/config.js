import { Create as CreatePerson } from "../person/create";
import { UnAssignedPersonList } from "../person/un-assigned-person-list";
import { Create as CreateCompany } from "../company/create";
import { ListEmployee } from "../company/list-employe";
import { AssignEmployee } from "../company/assign-employee";

// Router configuration. Each navigator should be in this format
/*
{
  text: "Text",
  route: "route",
  component: SomeComponent
}
*/
// This navigation being used in ../dashboard/index.js
export const personNavigation = {
  createPerson: {
    text: "Create Person",
    route: "/person/create",
    component: CreatePerson,
  },
  unAssignedPersonList: {
    text: "Un Assigned Persons",
    route: "/person/unassigned",
    component: UnAssignedPersonList,
  },
};

export const companyNavigation = {
  createCompany: {
    text: "Create Company",
    route: "/company/create",
    component: CreateCompany,
  },
  listEmployees: {
    text: "List Employees",
    route: "/company/employees",
    component: ListEmployee,
  },
  assignCompany: {
    text: "Assign Employee",
    route: "/company/assign",
    component: AssignEmployee,
  },
};
