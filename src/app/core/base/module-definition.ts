/**базовый класс для реализации в фича модулях
 * ядро предоставляет сервис для регистрации классов наследников
 * содержит описание фича модуля, предоставляет инфу о редюсерах и эпиках модуля
 * возможны расширения...
 */
export abstract class ModuleDefinitionBase {
  abstract id: Symbol | string;
  abstract name: string;
  abstract description?: string;
  abstract version: string;

  abstract get epic(): any;
  abstract get reducer(): any;
}
