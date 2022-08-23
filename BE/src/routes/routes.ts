import { Router } from "express";
import branchController from "../controller/branch-controller";
import employeeController from "../controller/employee-controller";

export const routes = Router();

routes.get('/branch', branchController.showAllBranch);
routes.post('/branch', branchController.addBranch);
routes.put('/branch/:id', branchController.updateBranch);
routes.delete('/branch/:id', branchController.deleteBranch);
routes.get('/branch/:id', branchController.getOneBranch);

routes.get('/employee', employeeController.showAllEmployee);
routes.post('/employee', employeeController.addEmployee);
routes.put('/employee/:id', employeeController.updateEmployee);
routes.delete('/employee/:id', employeeController.deleteEmployee);
routes.get('/employee/:id', employeeController.getOneEmployee);