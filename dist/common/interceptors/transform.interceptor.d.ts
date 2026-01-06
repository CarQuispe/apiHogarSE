import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
export declare class TransformInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, next: CallHandler): import("rxjs").Observable<{
        success: boolean;
        data: any;
    }>;
}
