import { ExceptionFilter, BadRequestException } from '@nestjs/common';
export declare class ValidationFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: any): void;
}
