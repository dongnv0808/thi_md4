import { Request, Response, NextFunction} from "express"
import { Employee } from "../model/employee";

class EmployeeController {
    showAllEmployee = async(req: any, res: Response) => {
        try{            
            let employees = await Employee.find().populate("branchId", "name");
            res.status(200).json(employees)
        }catch(err){
            res.status(404).json(err)
        }
    }
            
    addEmployee = async (req: any, res:Response, next: NextFunction) =>{
        try{
            let employee = req.body;
            let employeeNew = await (await Employee.create(employee)).populate("branchId", "name");
            res.status(201).json(employeeNew);
        }catch(err){
            next(err);
        }
    };

    updateEmployee = async (req: any, res: Response, next: NextFunction) => {
        try{
            let idEmployee = req.params.id;            
            let employee = await Employee.findById(idEmployee);
            if(!employee){
                res.status(404).json;
            }else{
                let data = req.body;
                await Employee.findOneAndUpdate({
                    _id: idEmployee
                }, data);
                data._id = idEmployee;
                employee = await Employee.findById(idEmployee).populate('branchId', 'name');
                res.status(200).json(employee);   
            }
        }catch(err){
            next(err);
        }
    }

    deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try{
            let employee = await Employee.findById(id);
            if(employee){
               employee.delete();
               res.status(204).json(); 
            }else{
                res.status(404).json();
            }
        }catch(err){
            next(err);
        }
    };

    getOneEmployee =async (req: any, res: Response, next: NextFunction) => {
        let id = req.params.id;
        let employee = await Employee.findById(id).populate('branchId', 'name');
        try{
            if(!employee){
                res.status(404).json();
            }else{
                res.status(200).json(employee);
            }
        }catch(err){
            next(err);
        }
    }
}

export default new EmployeeController();