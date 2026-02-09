import { PrismaService } from 'prisma/prisma.service';
import { PushService } from '../push/push.service';
export declare class JobsService {
    private prisma;
    private push;
    private readonly logger;
    constructor(prisma: PrismaService, push: PushService);
    reminderBeforeEvent(): Promise<void>;
    newEventNotification(): Promise<void>;
    capacityAlertJob(): Promise<void>;
    private logJob;
    getAllJobs(): Promise<{
        id: string;
        jobName: import(".prisma/client").$Enums.JobName;
        referenceId: string | null;
        executedAt: Date;
        notificationsSent: number;
    }[]>;
    getJobById(id: string): Promise<{
        id: string;
        jobName: import(".prisma/client").$Enums.JobName;
        referenceId: string | null;
        executedAt: Date;
        notificationsSent: number;
    } | null>;
    createJob(dto: any): Promise<{
        id: string;
        jobName: import(".prisma/client").$Enums.JobName;
        referenceId: string | null;
        executedAt: Date;
        notificationsSent: number;
    }>;
    updateJob(id: string, dto: any): Promise<{
        id: string;
        jobName: import(".prisma/client").$Enums.JobName;
        referenceId: string | null;
        executedAt: Date;
        notificationsSent: number;
    }>;
    deleteJob(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
