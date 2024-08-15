import {
  GLOBAL_TOKEN_SOURCE_LOOKUP,
  GLOBAL_TOKEN_TYPES,
  GlobalFunctionToken,
  GlobalStructureToken,
  GlobalTokens,
  IGlobalIndexedToken,
  IPropertyLookup,
  ParseIDLType,
} from '@idl/types/core';

import { IDLTask, IDLTaskSchemaVersion } from '../idltask.interface';
import { TaskTypeToIDLType } from './task-type-to-idl-type';

/**
 * Converts an IDL Task to global tokens for auto-complete
 */
export function IDLTaskToGlobal(
  global: GlobalTokens,
  task: IDLTask<IDLTaskSchemaVersion>
) {
  /** Get the name of our task */
  const name = `IDL${task.name}Task`;

  /** Lower-case name */
  const useName = name.toLowerCase();

  /** Structure */
  const struct: IGlobalIndexedToken<GlobalStructureToken> = {
    type: GLOBAL_TOKEN_TYPES.STRUCTURE,
    name: useName,
    pos: [0, 0, 0],
    meta: {
      display: name,
      source: GLOBAL_TOKEN_SOURCE_LOOKUP.USER,
      docs: task.description,
      private: false,
      inherits: ['idltask'], // lower-case
      docsLookup: {},
      props: {},
    },
  };

  // create properties
  const props: IPropertyLookup = {};
  for (let i = 0; i < task.parameters.length; i++) {
    const param = task.parameters[i];
    const propName = param.name.toLowerCase();
    const dir = param.direction.toLowerCase();

    // save our property
    props[propName] = {
      source: GLOBAL_TOKEN_SOURCE_LOOKUP.USER,
      code: true,
      pos: [0, 0, 0],
      direction: dir === 'input' ? 'in' : 'out',
      private: param.hidden ? true : false,
      display: task.parameters[i].name.toLowerCase(),
      docs: param.description,
      type: TaskTypeToIDLType(param.type),
    };
  }

  // save properties
  struct.meta.props = props;

  /** Function */
  const func: IGlobalIndexedToken<GlobalFunctionToken> = {
    type: GLOBAL_TOKEN_TYPES.FUNCTION,
    name: useName,
    pos: [0, 0, 0],
    meta: {
      display: name,
      source: GLOBAL_TOKEN_SOURCE_LOOKUP.USER,
      docs: task.description,
      private: false,
      returns: ParseIDLType(useName),
      args: {},
      kws: {},
      docsLookup: {},
      struct: [],
    },
  };

  // track global tokens
  global.push(struct);
  global.push(func);
}
