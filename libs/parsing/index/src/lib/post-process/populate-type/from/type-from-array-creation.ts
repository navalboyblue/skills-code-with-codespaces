import { CancellationToken } from '@idl/cancellation-tokens';
import {
  IParsed,
  SplitTreeOnCommas,
  SplitTreeOnOperators,
  TreeToken,
} from '@idl/parsing/syntax-tree';
import { BracketToken } from '@idl/parsing/tokenizer';
import {
  IDL_ARRAY_TYPE,
  IDL_TYPE_LOOKUP,
  IDLDataType,
  IDLTypeHelper,
  ParseIDLType,
  SerializeIDLType,
} from '@idl/types/core';
import copy from 'fast-copy';

import { IDLIndex } from '../../../idl-index.class';
import { TypeFromOperatorSplit } from './type-from-operator-split';
import { TypePromotion } from './type-promotion';

/**
 * Get the type from array creation
 */
export function TypeFromArrayCreation(
  index: IDLIndex,
  parsed: IParsed,
  token: TreeToken<BracketToken>
): IDLDataType {
  /** Data types that we have found */
  let foundTypes: IDLDataType[] = [];

  // split on operators
  const split = SplitTreeOnCommas(token.kids);

  // get the children and filter empty elements
  const splitCommas = split.children.filter((tree) => tree.length > 0);

  // process each split
  for (let i = 0; i < splitCommas.length; i++) {
    // sub split on operators to get types for each element
    const operatorSplit = SplitTreeOnOperators(
      splitCommas[i],
      new CancellationToken()
    );

    // get the children and filter empty elements
    const operatorSplitTrees = operatorSplit.children.filter(
      (tree) => tree.length > 0
    );

    // process each split
    for (let j = 0; j < operatorSplitTrees.length; j++) {
      const opSplit = TypeFromOperatorSplit(
        index,
        parsed,
        operatorSplitTrees[j]
      );

      // if not null, save
      if (!IDLTypeHelper.isType(opSplit, IDL_TYPE_LOOKUP.NULL)) {
        foundTypes = foundTypes.concat([opSplit]);
      }
    }
  }

  // determine how to proceed
  switch (true) {
    // if we have more than one type, promote it
    case foundTypes.length > 0: {
      // get the type we want to use
      const useType = TypePromotion(
        index,
        parsed,
        foundTypes,
        token.pos,
        token.end !== undefined ? token.end.pos : token.pos,
        true
      );

      // if we have an array, ignore because we don't track dimensionality
      if (IDLTypeHelper.isType(useType, IDL_TYPE_LOOKUP.ARRAY)) {
        return ParseIDLType(`Array<${SerializeIDLType(useType[0].args[0])}>`);
      } else {
        return ParseIDLType(`Array<${SerializeIDLType(useType)}>`);
      }
    }
    default:
      return copy(IDL_ARRAY_TYPE);
  }
}
