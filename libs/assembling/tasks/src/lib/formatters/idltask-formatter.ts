import { FormatterType, IAssemblerOptions } from '@idl/assembling/config';
import { AdjustCase } from '@idl/assembling/shared';
import { IDLTask, IDLTaskSchemaVersion } from '@idl/types/tasks';

import {
  REFERENCE_IDL_TASK,
  REFERENCE_IDL_TASK_PARAMETER,
} from '../references/idltask.interface';
import { OrderObject } from './order-object';

/**
 * Formats legacy ENVI Tasks
 */
export function IDLTaskFormatter<T extends FormatterType>(
  task: IDLTask<IDLTaskSchemaVersion>,
  options: IAssemblerOptions<T>
) {
  // get parameters
  const params = task.parameters;

  // process
  for (let i = 0; i < params.length; i++) {
    const param = params[i];

    // check if we have a keyword
    if (param.keyword !== undefined) {
      param.keyword = AdjustCase(
        param.keyword.replace(/\s/g, ''),
        options.style.keywords
      );
    }

    // check for name
    if (param.name !== undefined) {
      param.name = AdjustCase(
        param.name.replace(/\s/g, ''),
        options.style.keywords
      );
    }

    if (param.direction !== undefined) {
      param.direction = AdjustCase(
        param.direction.replace(/\s/g, ''),
        options.style.control
      );
    }

    // order parameter
    params[i] = OrderObject(param, REFERENCE_IDL_TASK_PARAMETER);
  }

  // order and return
  return OrderObject(task, REFERENCE_IDL_TASK);
}
