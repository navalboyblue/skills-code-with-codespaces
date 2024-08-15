import {
  IParsed,
  SyntaxProblemWithTranslation,
} from '@idl/parsing/syntax-tree';
import {
  IDL_ANY_TYPE,
  IDL_ARRAY_TYPE,
  IDL_BOOLEAN_TYPE,
  IDL_TYPE_LOOKUP,
  IDLDataType,
  IDLTypeHelper,
  ParseIDLType,
  SerializeIDLType,
} from '@idl/types/core';
import { IDL_PROBLEM_CODES, IDLProblemCode } from '@idl/types/problem-codes';
import { PositionArray } from '@idl/types/tokenizer';
import copy from 'fast-copy';

import { IDLIndex } from '../../../idl-index.class';
import {
  COMPATIBLE_ERROR_CODES,
  COMPATIBLE_OPERATOR_TYPES,
  TYPE_ORDER,
} from './type-promotion.interface';

/**
 * Merges/validates types that are being combined together.
 *
 * Has two special cases:
 *
 *   1. If we only have one type passed in, we return it
 *   2. We reduce the types provided and, if we only have one type left
 *      after reducing then we return that
 */
export function TypePromotion(
  index: IDLIndex,
  parsed: IParsed,
  types: IDLDataType[],
  startPos: PositionArray,
  endPos: PositionArray,
  arrays = false
): IDLDataType {
  // attempt to reduce and see if we only have one type
  let merged: IDLDataType = [];
  for (let i = 0; i < types.length; i++) {
    merged = merged.concat(types[i]);
  }

  // return if we dont have anything to merge
  if (merged.length === 1) {
    return merged;
  }

  /**
   * Reduce our type and use special logic if we are working with arrays or not
   */
  const reduced = arrays
    ? IDLTypeHelper.arrayReduce(merged)
    : IDLTypeHelper.reduceIDLDataType(merged);

  // if we only have one type, return it
  if (reduced.length === 1) {
    return reduced;
  }

  // if we have an any type, return
  if (IDLTypeHelper.isAnyType(reduced)) {
    return copy(IDL_ANY_TYPE);
  }

  // check special case for arrays where we can combine objects together
  if (arrays) {
    let simplify = true;
    for (let i = 0; i < reduced.length; i++) {
      if (
        reduced[i].name === IDL_TYPE_LOOKUP.STRUCTURE ||
        TYPE_ORDER.indexOf(reduced[i].name) !== -1
      ) {
        simplify = false;
        break;
      }
    }
    if (simplify) {
      return ParseIDLType(`Array<${SerializeIDLType(reduced)}>`);
    }
  }

  /** track if we have an array */
  let isArray = false;

  /** Track if we just use "number" */
  let isNumber = false;

  /** Track if we have null */
  let isNull = false;

  // /** Track if we have a complex type */
  // let isComplex = false;

  /** Track if we have an object and all types need to be the same */
  let compatibleTypes: string[] = [];

  /** If we have a list of compatible types, track their args so we can merge them */
  let compatibleTypeArgs: IDLDataType = [];

  /** Error code for compatible types, depends on what we find first */
  let compatibleErrorCode: IDLProblemCode;

  /** If we have compatible types being joined, type we expect from the joining */
  let compatibleBaseType: string;

  /** Track the highest type that we have from our type order */
  let highestType = TYPE_ORDER.length + 1;

  // process each child type
  for (let i = 0; i < reduced.length; i++) {
    /** Potential sub-type for each type we are comparing against (i.e. the "or" operator between more than one) */
    const type = reduced[i];

    // if we have a structure, throw an error
    if (type.name === IDL_TYPE_LOOKUP.STRUCTURE) {
      // report problem
      parsed.postProcessProblems.push(
        SyntaxProblemWithTranslation(
          IDL_PROBLEM_CODES.ILLEGAL_STRUCTURE_OPERATION,
          startPos,
          endPos
        )
      );

      return copy(IDL_ANY_TYPE);
    }

    // check if we are a number
    isNumber = isNumber || type.name === IDL_TYPE_LOOKUP.NUMBER;

    // check if we are null
    isNull = isNull || type.name === IDL_TYPE_LOOKUP.NULL;

    /**
     * Check if we need to restrict the types that we are combining. This is for data structures
     * such as list, hash, etc.
     */
    if (compatibleTypes.length === 0) {
      // if we have restricted types, update
      if (type.name in COMPATIBLE_OPERATOR_TYPES) {
        // save the type name
        compatibleBaseType = type.name;

        // save error code
        compatibleErrorCode = COMPATIBLE_ERROR_CODES[type.name];

        /**
         * If we have type restrictions for operators, and this is not the
         * first type that we have encountered, then there is likely an error
         * in the user's code
         */
        if (i > 0) {
          // report problem
          parsed.postProcessProblems.push(
            SyntaxProblemWithTranslation(compatibleErrorCode, startPos, endPos)
          );

          // return any
          return copy(IDL_ANY_TYPE);
        }

        // save compatible types
        compatibleTypes = COMPATIBLE_OPERATOR_TYPES[type.name];

        // save the compatible type args
        compatibleTypeArgs = compatibleTypeArgs.concat(
          type.args.length > 0 ? type.args[0] : []
        );

        // skip everything else
        continue;
      }
    } else {
      /**
       * If we have a compatible type, save our type arguments which will be used for the
       * return type.
       */
      if (compatibleTypes.indexOf(type.name) !== -1) {
        // save the compatible type args
        compatibleTypeArgs = compatibleTypeArgs.concat(
          type.args.length > 0 ? type.args[0] : []
        );
        continue;
      } else {
        /**
         * If we arent compatible, then report an error
         */
        parsed.postProcessProblems.push(
          SyntaxProblemWithTranslation(compatibleErrorCode, startPos, endPos)
        );

        /**
         * TODO: Incompatible type joining, this would throw a syntax error
         */
        return copy(IDL_ANY_TYPE);
      }
    }

    /**
     * Do some type promotion and handle the case where we are an array
     */
    if (type.name === IDL_TYPE_LOOKUP.ARRAY) {
      // update flag for array
      isArray = true;

      /**
       * Check each type that our array might be (our type args)
       */
      if (type.args.length > 0) {
        const tArg = type.args[0];

        // if we have any, return any
        if (IDLTypeHelper.isAnyType(tArg)) {
          return copy(IDL_ARRAY_TYPE);
        }

        // check the type of all the values we contain
        for (let z = 0; z < tArg.length; z++) {
          highestType = Math.min(highestType, TYPE_ORDER.indexOf(tArg[z].name));
        }
      }
    } else {
      /**
       * We have a scalar if we dont have an array, so lets make sure we have a known
       * type that we can promote
       */
      highestType = Math.min(highestType, TYPE_ORDER.indexOf(type.name));
    }

    /**
     * If we have a type not present in our type order (i.e. promotable types), but we previously
     * did then we have an incompatible type join.
     *
     * This could also be from methods that override operators which we
     * don't have handled right now.
     */
    if (highestType === -1) {
      /**
       * TODO: check for overloads
       */
      switch (true) {
        /**
         * Treat null as boolean for better decisions
         */
        case isNull:
          if (isArray) {
            return ParseIDLType('Array<Boolean>');
          } else {
            return copy(IDL_BOOLEAN_TYPE);
          }
        /**
         * Handle arrays
         */
        case isArray:
          // report problem
          parsed.postProcessProblems.push(
            SyntaxProblemWithTranslation(
              IDL_PROBLEM_CODES.POTENTIAL_IDL_ARRAY_TYPE_INCOMPATIBILITIES,
              startPos,
              endPos
            )
          );
          return copy(IDL_ARRAY_TYPE);
        /**
         * Default unknown types
         */
        default:
          // report problem
          parsed.postProcessProblems.push(
            SyntaxProblemWithTranslation(
              IDL_PROBLEM_CODES.POTENTIAL_TYPE_INCOMPATIBILITIES,
              startPos,
              endPos
            )
          );
          return copy(IDL_ANY_TYPE);
      }
    }
  }

  // update our highest type if complex and we have a number
  if (
    TYPE_ORDER[highestType] === IDL_TYPE_LOOKUP.COMPLEX_FLOAT ||
    TYPE_ORDER[highestType] === IDL_TYPE_LOOKUP.COMPLEX_DOUBLE
  ) {
    if (isNumber) {
      highestType = TYPE_ORDER.indexOf(IDL_TYPE_LOOKUP.COMPLEX_NUMBER);
    }
  }

  switch (true) {
    case compatibleBaseType !== undefined:
      return ParseIDLType(
        `${compatibleBaseType}<${SerializeIDLType(compatibleTypeArgs)}>`
      );
    case isArray:
      return ParseIDLType(
        `Array<${
          highestType === TYPE_ORDER.length + 1
            ? 'any'
            : TYPE_ORDER[highestType]
        }>`
      );
    default:
      return highestType === TYPE_ORDER.length + 1
        ? copy(IDL_ANY_TYPE)
        : ParseIDLType(TYPE_ORDER[highestType]);
  }
}
