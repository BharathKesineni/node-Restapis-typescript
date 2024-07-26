
import { AppDataSource } from "../../index";
import { Task } from "./tasks.entitiy";
import {instanceToPlain} from 'class-transformer'
export class TasksController {
    constructor(private taskRepository = AppDataSource.getRepository(Task)) {}

    public async getAll(): Promise<Task[]> {
          // Declare a list of variable to hold all tasks
        let allTasks: Task[];
         // Fetch all tasks using Repositories
        try {
            allTasks = await this.taskRepository.find({
                order: {
                    date: "ASC"
                }
            });

            allTasks=instanceToPlain(allTasks) as Task[];
            return allTasks;
        } catch (err) {
            console.log(err);
            throw err;  // Optionally re-throw the error if you want the caller to handle it
        }
        
    }
}
