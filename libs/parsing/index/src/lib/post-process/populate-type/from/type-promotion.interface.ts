import { IDL_TYPE_LOOKUP } from '@idl/data-types/core';
import { IDL_PROBLEM_CODES, IDLProblemCode } from '@idl/parsing/problem-codes';

/**
 * Order of our types in appearance of priority
 */
export const TYPE_ORDER: string[] = [
  IDL_TYPE_LOOKUP.COMPLEX_NUMBER,
  IDL_TYPE_LOOKUP.COMPLEX_DOUBLE,
  IDL_TYPE_LOOKUP.COMPLEX_FLOAT,
  IDL_TYPE_LOOKUP.NUMBER,
  IDL_TYPE_LOOKUP.BIG_INTEGER,
  IDL_TYPE_LOOKUP.DOUBLE,
  IDL_TYPE_LOOKUP.FLOAT,
  IDL_TYPE_LOOKUP.UNSIGNED_LONG64,
  IDL_TYPE_LOOKUP.LONG64,
  IDL_TYPE_LOOKUP.UNSIGNED_LONG,
  IDL_TYPE_LOOKUP.LONG,
  IDL_TYPE_LOOKUP.UNSIGNED_INTEGER,
  IDL_TYPE_LOOKUP.INTEGER,
  IDL_TYPE_LOOKUP.BYTE,
  IDL_TYPE_LOOKUP.BOOLEAN,
  IDL_TYPE_LOOKUP.STRING,
];

/**
 * Types that we can add together for objects
 */
export const TYPE_OBJECT_ORDER: string[] = [
  IDL_TYPE_LOOKUP.HASH,
  IDL_TYPE_LOOKUP.ORDERED_HASH,
  IDL_TYPE_LOOKUP.DICTIONARY,
];

/**
 * Data types that represent compelx values
 */
export const COMPLEX_TYPES: { [key: string]: any } = {};
COMPLEX_TYPES[IDL_TYPE_LOOKUP.COMPLEX_NUMBER] = true;
COMPLEX_TYPES[IDL_TYPE_LOOKUP.COMPLEX_DOUBLE] = true;
COMPLEX_TYPES[IDL_TYPE_LOOKUP.COMPLEX_FLOAT] = true;

/**
 * For objects, types of values that can be combined together
 */
export const COMPATIBLE_OPERATOR_TYPES: { [key: string]: string[] } = {};
// only lists can be joined together
COMPATIBLE_OPERATOR_TYPES[IDL_TYPE_LOOKUP.LIST] = [IDL_TYPE_LOOKUP.LIST];
COMPATIBLE_OPERATOR_TYPES[IDL_TYPE_LOOKUP.HASH] = [
  IDL_TYPE_LOOKUP.HASH, // output type
  IDL_TYPE_LOOKUP.ORDERED_HASH,
  IDL_TYPE_LOOKUP.DICTIONARY,
];
COMPATIBLE_OPERATOR_TYPES[IDL_TYPE_LOOKUP.ORDERED_HASH] = [
  IDL_TYPE_LOOKUP.ORDERED_HASH, // output type
  IDL_TYPE_LOOKUP.HASH,
  IDL_TYPE_LOOKUP.DICTIONARY,
];
COMPATIBLE_OPERATOR_TYPES[IDL_TYPE_LOOKUP.DICTIONARY] = [
  IDL_TYPE_LOOKUP.DICTIONARY, // output type
  IDL_TYPE_LOOKUP.HASH,
  IDL_TYPE_LOOKUP.ORDERED_HASH,
];

/**
 * For objects, types of values that can be combined together
 */
export const COMPATIBLE_ERROR_CODES: { [key: string]: IDLProblemCode } = {};
COMPATIBLE_ERROR_CODES[IDL_TYPE_LOOKUP.LIST] =
  IDL_PROBLEM_CODES.ILLEGAL_LIST_OPERATION;
COMPATIBLE_ERROR_CODES[IDL_TYPE_LOOKUP.HASH] =
  IDL_PROBLEM_CODES.ILLEGAL_HASH_OPERATION;
COMPATIBLE_ERROR_CODES[IDL_TYPE_LOOKUP.ORDERED_HASH] =
  IDL_PROBLEM_CODES.ILLEGAL_ORDERED_HASH_OPERATION;
COMPATIBLE_ERROR_CODES[IDL_TYPE_LOOKUP.DICTIONARY] =
  IDL_PROBLEM_CODES.ILLEGAL_DICTIONARY_OPERATION;
