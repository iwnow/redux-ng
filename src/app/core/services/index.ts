import { ExceptionHandlerCoreService } from './exception-handler-core.service';
import { ModuleRegistrationCoreService } from './module-registration-core.service';

const SERVICE_PROVIDERS = [
  ExceptionHandlerCoreService,
  ModuleRegistrationCoreService
];

export {
  SERVICE_PROVIDERS,
  ExceptionHandlerCoreService,
  ModuleRegistrationCoreService
};
