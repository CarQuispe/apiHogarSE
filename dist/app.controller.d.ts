export declare class AppController {
    getRoot(): {
        message: string;
        service: string;
        version: string;
        timestamp: string;
        status: string;
        documentation: string;
        endpoints: {
            auth: {
                login: string;
                register: string;
                profile: string;
            };
            ninios: {
                list: string;
                create: string;
                detail: string;
            };
            health: string;
        };
        environment: string;
    };
    healthCheck(): {
        status: string;
        service: string;
        uptime: number;
        timestamp: string;
        database: string;
        memory: NodeJS.MemoryUsage;
        nodeVersion: string;
    };
    getVersion(): {
        version: string;
        build: string;
        timestamp: string;
    };
}
