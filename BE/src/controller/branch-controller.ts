import { Request, Response, NextFunction} from "express"
import { Branch } from "../model/Branch";

class BranchController {
    showAllBranch = async(req: any, res: Response) => {
        try{            
            let branchs = await Branch.find();
            res.status(200).json(branchs)
        }catch(err){
            res.status(404).json(err)
        }
    }
            
    addBranch = async (req: any, res:Response, next: NextFunction) =>{
        try{
            let branch = req.body;
            let branchNew = await Branch.create(branch);
            res.status(201).json(branchNew);
        }catch(err){
            next(err);
        }
    };

    updateBranch = async (req: any, res: Response, next: NextFunction) => {
        try{
            let idBranch = req.params.id;            
            let branch = await Branch.findById(idBranch);
            if(!branch){
                res.status(404).json;
            }else{
                let data = req.body;
                data._id = idBranch;
                await Branch.findByIdAndUpdate({
                    _id: idBranch
                },data);                
                res.status(200).json(data);   
            }
        }catch(err){
            next(err);
        }
    }

    deleteBranch = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try{
            let branch = await Branch.findById(id);
            if(branch){
               branch.delete();
               res.status(204).json(); 
            }else{
                res.status(404).json();
            }
        }catch(err){
            next(err);
        }
    };

    getOneBranch =async (req: any, res: Response, next: NextFunction) => {
        let id = req.params.id;
        let branch = await Branch.findById(id);
        try{
            if(!branch){
                res.status(404).json();
            }else{
                res.status(200).json(branch);
            }
        }catch(err){
            next(err);
        }
    }
}

export default new BranchController();