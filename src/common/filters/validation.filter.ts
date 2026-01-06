import {
  ExceptionFilter,
  Catch,
  BadRequestException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host) {
    const response = host.switchToHttp().getResponse();

    response.status(400).json({
      success: false,
      errors: exception.getResponse(),
    });
  }
}
