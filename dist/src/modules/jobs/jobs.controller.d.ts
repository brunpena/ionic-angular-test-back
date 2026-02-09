import { JobsService } from './jobs.service';
export declare class JobsController {
    private jobs;
    constructor(jobs: JobsService);
    runReminder(): Promise<void>;
    runNewEvent(): Promise<void>;
    runCapacity(): Promise<void>;
    getAll(): Promise<{
        id: string;
        jobName: import(".prisma/client").$Enums.JobName;
        referenceId: string | null;
        executedAt: Date;
        notificationsSent: number;
    }[]>;
    getOne(id: string): Promise<{
        id: string;
        jobName: import(".prisma/client").$Enums.JobName;
        referenceId: string | null;
        executedAt: Date;
        notificationsSent: number;
    } | null>;
    delete(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
