import { model, Schema } from "mongoose"
import { IBranch } from "./branch";
export interface IEmployee {
    employeeCode: string,
    name: string;
    age: number,
    salary: number,
    branchId: IBranch
}

const employeeSchema = new Schema<IEmployee>({
    employeeCode: String,
    name: String,
    age: Number,
    salary: Number,
    branchId: {
        type: Schema.Types.ObjectId,
        ref: "branchs"
    }
})

const Employee = model<IEmployee>('employees', employeeSchema);

export {Employee};