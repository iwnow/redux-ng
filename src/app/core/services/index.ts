import { ExceptionHandlerService } from './exception-handler.service';
import { ModuleRegistrationService } from './module-registration.service';

const SERVICE_PROVIDERS = [
  ExceptionHandlerService,
  ModuleRegistrationService
];

export {
  SERVICE_PROVIDERS,
  ExceptionHandlerService,
  ModuleRegistrationService
};
