import { CancellationToken } from '@idl/cancellation-tokens';
import { Parser } from '@idl/parser';
import { SyntaxTree } from '@idl/parsing/syntax-tree';
import { SyntaxProblems } from '@idl/types/problem-codes';

describe(`[auto generated] Correctly extract keyword definitions`, () => {
  it(`[auto generated] Convert variables to keywords in standard routine definitions`, () => {
    // test code to extract tokens from
    const code = [
      `pro mypro, arg1, arg2, arg3, KW1=kw1,$ ; commment`,
      `  KW2 = kw2, KW3 = kw3`,
      `  compile_opt idl2`,
      ``,
      `end`,
    ];

    // extract tokens
    const tokenized = Parser(code, new CancellationToken());

    // define expected syntax tree
    const expectedTree: SyntaxTree = [
      {
        type: 0,
        name: 72,
        pos: [0, 0, 4],
        match: ['pro ', 'pro'],
        idx: 0,
        scope: [],
        parseProblems: [],
        end: { pos: [4, 0, 3], match: ['end'] },
        kids: [
          {
            type: 0,
            name: 71,
            pos: [0, 4, 5],
            match: ['mypro'],
            idx: 0,
            scope: [72],
            parseProblems: [],
            end: { pos: [1, 22, 0], match: [''] },
            kids: [
              {
                type: 1,
                name: 14,
                pos: [0, 9, 1],
                match: [','],
                idx: 0,
                scope: [72, 71],
                parseProblems: [],
              },
              {
                type: 1,
                name: 1,
                pos: [0, 11, 4],
                match: ['arg1'],
                idx: 1,
                scope: [72, 71],
                parseProblems: [],
              },
              {
                type: 1,
                name: 14,
                pos: [0, 15, 1],
                match: [','],
                idx: 2,
                scope: [72, 71],
                parseProblems: [],
              },
              {
                type: 1,
                name: 1,
                pos: [0, 17, 4],
                match: ['arg2'],
                idx: 3,
                scope: [72, 71],
                parseProblems: [],
              },
              {
                type: 1,
                name: 14,
                pos: [0, 21, 1],
                match: [','],
                idx: 4,
                scope: [72, 71],
                parseProblems: [],
              },
              {
                type: 1,
                name: 1,
                pos: [0, 23, 4],
                match: ['arg3'],
                idx: 5,
                scope: [72, 71],
                parseProblems: [],
              },
              {
                type: 1,
                name: 14,
                pos: [0, 27, 1],
                match: [','],
                idx: 6,
                scope: [72, 71],
                parseProblems: [],
              },
              {
                type: 1,
                name: 30,
                pos: [0, 29, 3],
                match: ['KW1'],
                idx: 7,
                scope: [72, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [0, 32, 1],
                match: ['='],
                idx: 8,
                scope: [72, 71],
                parseProblems: [],
                end: { pos: [0, 36, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [0, 33, 3],
                    match: ['kw1'],
                    idx: 0,
                    scope: [72, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [0, 36, 1],
                match: [','],
                idx: 9,
                scope: [72, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [0, 37, 1],
                match: ['$'],
                idx: 10,
                scope: [72, 71],
                parseProblems: [],
                end: { pos: [0, 49, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 15,
                    pos: [0, 39, 10],
                    match: ['; commment'],
                    idx: 0,
                    scope: [72, 71, 31],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 30,
                pos: [1, 2, 3],
                match: ['KW2'],
                idx: 11,
                scope: [72, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [1, 6, 1],
                match: ['='],
                idx: 12,
                scope: [72, 71],
                parseProblems: [],
                end: { pos: [1, 11, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [1, 8, 3],
                    match: ['kw2'],
                    idx: 0,
                    scope: [72, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [1, 11, 1],
                match: [','],
                idx: 13,
                scope: [72, 71],
                parseProblems: [],
              },
              {
                type: 1,
                name: 30,
                pos: [1, 13, 3],
                match: ['KW3'],
                idx: 14,
                scope: [72, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [1, 17, 1],
                match: ['='],
                idx: 15,
                scope: [72, 71],
                parseProblems: [],
                end: { pos: [1, 22, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [1, 19, 3],
                    match: ['kw3'],
                    idx: 0,
                    scope: [72, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
            ],
          },
          {
            type: 0,
            name: 20,
            pos: [2, 2, 11],
            match: ['compile_opt'],
            idx: 1,
            scope: [72],
            parseProblems: [],
            end: { pos: [2, 18, 0], match: [''] },
            kids: [
              {
                type: 1,
                name: 25,
                pos: [2, 14, 4],
                match: ['idl2'],
                idx: 0,
                scope: [72, 20],
                parseProblems: [],
              },
            ],
          },
        ],
      },
    ];

    // verify results
    expect(tokenized.tree).toEqual(expectedTree);

    // define expected problems
    const expectedProblems: SyntaxProblems = [];

    // verify results
    expect(
      tokenized.parseProblems.concat(tokenized.postProcessProblems)
    ).toEqual(expectedProblems);
  });

  it(`[auto generated] Convert variables to keywords in routine method definition`, () => {
    // test code to extract tokens from
    const code = [
      `pro mypro::mymethod, arg1, arg2, arg3, KW1=kw1,$ ; commment`,
      `  KW2 = kw2, KW3 = kw3`,
      `  compile_opt idl2`,
      ``,
      `end`,
    ];

    // extract tokens
    const tokenized = Parser(code, new CancellationToken());

    // define expected syntax tree
    const expectedTree: SyntaxTree = [
      {
        type: 0,
        name: 72,
        pos: [0, 0, 4],
        match: ['pro ', 'pro'],
        idx: 0,
        scope: [],
        parseProblems: [],
        end: { pos: [4, 0, 3], match: ['end'] },
        kids: [
          {
            type: 0,
            name: 70,
            pos: [0, 4, 15],
            match: ['mypro::mymethod', 'mypro', 'mymethod'],
            idx: 0,
            scope: [72],
            parseProblems: [],
            end: { pos: [1, 22, 0], match: [''] },
            kids: [
              {
                type: 1,
                name: 14,
                pos: [0, 19, 1],
                match: [','],
                idx: 0,
                scope: [72, 70],
                parseProblems: [],
              },
              {
                type: 1,
                name: 1,
                pos: [0, 21, 4],
                match: ['arg1'],
                idx: 1,
                scope: [72, 70],
                parseProblems: [],
              },
              {
                type: 1,
                name: 14,
                pos: [0, 25, 1],
                match: [','],
                idx: 2,
                scope: [72, 70],
                parseProblems: [],
              },
              {
                type: 1,
                name: 1,
                pos: [0, 27, 4],
                match: ['arg2'],
                idx: 3,
                scope: [72, 70],
                parseProblems: [],
              },
              {
                type: 1,
                name: 14,
                pos: [0, 31, 1],
                match: [','],
                idx: 4,
                scope: [72, 70],
                parseProblems: [],
              },
              {
                type: 1,
                name: 1,
                pos: [0, 33, 4],
                match: ['arg3'],
                idx: 5,
                scope: [72, 70],
                parseProblems: [],
              },
              {
                type: 1,
                name: 14,
                pos: [0, 37, 1],
                match: [','],
                idx: 6,
                scope: [72, 70],
                parseProblems: [],
              },
              {
                type: 1,
                name: 30,
                pos: [0, 39, 3],
                match: ['KW1'],
                idx: 7,
                scope: [72, 70],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [0, 42, 1],
                match: ['='],
                idx: 8,
                scope: [72, 70],
                parseProblems: [],
                end: { pos: [0, 46, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [0, 43, 3],
                    match: ['kw1'],
                    idx: 0,
                    scope: [72, 70, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [0, 46, 1],
                match: [','],
                idx: 9,
                scope: [72, 70],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [0, 47, 1],
                match: ['$'],
                idx: 10,
                scope: [72, 70],
                parseProblems: [],
                end: { pos: [0, 59, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 15,
                    pos: [0, 49, 10],
                    match: ['; commment'],
                    idx: 0,
                    scope: [72, 70, 31],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 30,
                pos: [1, 2, 3],
                match: ['KW2'],
                idx: 11,
                scope: [72, 70],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [1, 6, 1],
                match: ['='],
                idx: 12,
                scope: [72, 70],
                parseProblems: [],
                end: { pos: [1, 11, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [1, 8, 3],
                    match: ['kw2'],
                    idx: 0,
                    scope: [72, 70, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [1, 11, 1],
                match: [','],
                idx: 13,
                scope: [72, 70],
                parseProblems: [],
              },
              {
                type: 1,
                name: 30,
                pos: [1, 13, 3],
                match: ['KW3'],
                idx: 14,
                scope: [72, 70],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [1, 17, 1],
                match: ['='],
                idx: 15,
                scope: [72, 70],
                parseProblems: [],
                end: { pos: [1, 22, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [1, 19, 3],
                    match: ['kw3'],
                    idx: 0,
                    scope: [72, 70, 3],
                    parseProblems: [],
                  },
                ],
              },
            ],
          },
          {
            type: 0,
            name: 20,
            pos: [2, 2, 11],
            match: ['compile_opt'],
            idx: 1,
            scope: [72],
            parseProblems: [],
            end: { pos: [2, 18, 0], match: [''] },
            kids: [
              {
                type: 1,
                name: 25,
                pos: [2, 14, 4],
                match: ['idl2'],
                idx: 0,
                scope: [72, 20],
                parseProblems: [],
              },
            ],
          },
        ],
      },
    ];

    // verify results
    expect(tokenized.tree).toEqual(expectedTree);

    // define expected problems
    const expectedProblems: SyntaxProblems = [];

    // verify results
    expect(
      tokenized.parseProblems.concat(tokenized.postProcessProblems)
    ).toEqual(expectedProblems);
  });

  it(`[auto generated] from complex example`, () => {
    // test code to extract tokens from
    const code = [
      `function TS_HANTS2, timeseries, $`,
      `amplitudes = amp, $`,
      `delta = delta, $`,
      `dod = dod, $`,
      `double = double, $`,
      `err_tolerance = err_tolerance, $`,
      `; FREQUENCIES=freq, $`,
      `HIGH = HIGH, $`,
      `low = low, $`,
      `num_frequencies = num_frequencies, $`,
      `num_period = num_period, $`,
      `phases = phases, $`,
      `range_maximum = range_maximum, $`,
      `range_minimum = range_minimum, $`,
      `time_sample = time_sample, $`,
      `num_images = num_images`,
      ``,
      `compile_opt idl2`,
      ``,
      `a = IDL_Number.total()`,
      ``,
      `return, name`,
      `end`,
    ];

    // extract tokens
    const tokenized = Parser(code, new CancellationToken());

    // define expected syntax tree
    const expectedTree: SyntaxTree = [
      {
        type: 0,
        name: 69,
        pos: [0, 0, 9],
        match: ['function ', 'function'],
        idx: 0,
        scope: [],
        parseProblems: [],
        end: { pos: [22, 0, 3], match: ['end'] },
        kids: [
          {
            type: 0,
            name: 71,
            pos: [0, 9, 9],
            match: ['TS_HANTS2'],
            idx: 0,
            scope: [69],
            parseProblems: [],
            end: { pos: [15, 23, 0], match: [''] },
            kids: [
              {
                type: 1,
                name: 14,
                pos: [0, 18, 1],
                match: [','],
                idx: 0,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 1,
                name: 1,
                pos: [0, 20, 10],
                match: ['timeseries'],
                idx: 1,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 1,
                name: 14,
                pos: [0, 30, 1],
                match: [','],
                idx: 2,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [0, 32, 1],
                match: ['$'],
                idx: 3,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [0, 33, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [1, 0, 10],
                match: ['amplitudes'],
                idx: 4,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [1, 11, 1],
                match: ['='],
                idx: 5,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [1, 16, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [1, 13, 3],
                    match: ['amp'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [1, 16, 1],
                match: [','],
                idx: 6,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [1, 18, 1],
                match: ['$'],
                idx: 7,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [1, 19, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [2, 0, 5],
                match: ['delta'],
                idx: 8,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [2, 6, 1],
                match: ['='],
                idx: 9,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [2, 13, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [2, 8, 5],
                    match: ['delta'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [2, 13, 1],
                match: [','],
                idx: 10,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [2, 15, 1],
                match: ['$'],
                idx: 11,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [2, 16, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [3, 0, 3],
                match: ['dod'],
                idx: 12,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [3, 4, 1],
                match: ['='],
                idx: 13,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [3, 9, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [3, 6, 3],
                    match: ['dod'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [3, 9, 1],
                match: [','],
                idx: 14,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [3, 11, 1],
                match: ['$'],
                idx: 15,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [3, 12, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [4, 0, 6],
                match: ['double'],
                idx: 16,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [4, 7, 1],
                match: ['='],
                idx: 17,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [4, 15, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [4, 9, 6],
                    match: ['double'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [4, 15, 1],
                match: [','],
                idx: 18,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [4, 17, 1],
                match: ['$'],
                idx: 19,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [4, 18, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [5, 0, 13],
                match: ['err_tolerance'],
                idx: 20,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [5, 14, 1],
                match: ['='],
                idx: 21,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [5, 29, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [5, 16, 13],
                    match: ['err_tolerance'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [5, 29, 1],
                match: [','],
                idx: 22,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [5, 31, 1],
                match: ['$'],
                idx: 23,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [5, 32, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 15,
                pos: [6, 0, 21],
                match: ['; FREQUENCIES=freq, $'],
                idx: 24,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 1,
                name: 30,
                pos: [7, 0, 4],
                match: ['HIGH'],
                idx: 25,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [7, 5, 1],
                match: ['='],
                idx: 26,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [7, 11, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [7, 7, 4],
                    match: ['HIGH'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [7, 11, 1],
                match: [','],
                idx: 27,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [7, 13, 1],
                match: ['$'],
                idx: 28,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [7, 14, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [8, 0, 3],
                match: ['low'],
                idx: 29,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [8, 4, 1],
                match: ['='],
                idx: 30,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [8, 9, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [8, 6, 3],
                    match: ['low'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [8, 9, 1],
                match: [','],
                idx: 31,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [8, 11, 1],
                match: ['$'],
                idx: 32,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [8, 12, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [9, 0, 15],
                match: ['num_frequencies'],
                idx: 33,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [9, 16, 1],
                match: ['='],
                idx: 34,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [9, 33, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [9, 18, 15],
                    match: ['num_frequencies'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [9, 33, 1],
                match: [','],
                idx: 35,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [9, 35, 1],
                match: ['$'],
                idx: 36,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [9, 36, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [10, 0, 10],
                match: ['num_period'],
                idx: 37,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [10, 11, 1],
                match: ['='],
                idx: 38,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [10, 23, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [10, 13, 10],
                    match: ['num_period'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [10, 23, 1],
                match: [','],
                idx: 39,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [10, 25, 1],
                match: ['$'],
                idx: 40,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [10, 26, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [11, 0, 6],
                match: ['phases'],
                idx: 41,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [11, 7, 1],
                match: ['='],
                idx: 42,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [11, 15, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [11, 9, 6],
                    match: ['phases'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [11, 15, 1],
                match: [','],
                idx: 43,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [11, 17, 1],
                match: ['$'],
                idx: 44,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [11, 18, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [12, 0, 13],
                match: ['range_maximum'],
                idx: 45,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [12, 14, 1],
                match: ['='],
                idx: 46,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [12, 29, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [12, 16, 13],
                    match: ['range_maximum'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [12, 29, 1],
                match: [','],
                idx: 47,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [12, 31, 1],
                match: ['$'],
                idx: 48,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [12, 32, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [13, 0, 13],
                match: ['range_minimum'],
                idx: 49,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [13, 14, 1],
                match: ['='],
                idx: 50,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [13, 29, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [13, 16, 13],
                    match: ['range_minimum'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [13, 29, 1],
                match: [','],
                idx: 51,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [13, 31, 1],
                match: ['$'],
                idx: 52,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [13, 32, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [14, 0, 11],
                match: ['time_sample'],
                idx: 53,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [14, 12, 1],
                match: ['='],
                idx: 54,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [14, 25, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [14, 14, 11],
                    match: ['time_sample'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
              {
                type: 1,
                name: 14,
                pos: [14, 25, 1],
                match: [','],
                idx: 55,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 31,
                pos: [14, 27, 1],
                match: ['$'],
                idx: 56,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [14, 28, 0], match: [''] },
                kids: [],
              },
              {
                type: 1,
                name: 30,
                pos: [15, 0, 10],
                match: ['num_images'],
                idx: 57,
                scope: [69, 71],
                parseProblems: [],
              },
              {
                type: 0,
                name: 3,
                pos: [15, 11, 1],
                match: ['='],
                idx: 58,
                scope: [69, 71],
                parseProblems: [],
                end: { pos: [15, 23, 0], match: [''] },
                kids: [
                  {
                    type: 1,
                    name: 85,
                    pos: [15, 13, 10],
                    match: ['num_images'],
                    idx: 0,
                    scope: [69, 71, 3],
                    parseProblems: [],
                  },
                ],
              },
            ],
          },
          {
            type: 0,
            name: 20,
            pos: [17, 0, 11],
            match: ['compile_opt'],
            idx: 1,
            scope: [69],
            parseProblems: [],
            end: { pos: [17, 16, 0], match: [''] },
            kids: [
              {
                type: 1,
                name: 25,
                pos: [17, 12, 4],
                match: ['idl2'],
                idx: 0,
                scope: [69, 20],
                parseProblems: [],
              },
            ],
          },
          {
            type: 1,
            name: 85,
            pos: [19, 0, 1],
            match: ['a'],
            idx: 2,
            scope: [69],
            parseProblems: [],
          },
          {
            type: 0,
            name: 3,
            pos: [19, 2, 1],
            match: ['='],
            idx: 3,
            scope: [69],
            parseProblems: [],
            end: { pos: [19, 22, 0], match: [''] },
            kids: [
              {
                type: 1,
                name: 85,
                pos: [19, 4, 10],
                match: ['IDL_Number'],
                idx: 0,
                scope: [69, 3],
                parseProblems: [],
              },
              {
                type: 0,
                name: 9,
                pos: [19, 14, 7],
                match: ['.total(', '.', 'total', '('],
                idx: 1,
                scope: [69, 3],
                parseProblems: [],
                end: { pos: [19, 21, 1], match: [')'] },
                kids: [],
              },
            ],
          },
          {
            type: 0,
            name: 11,
            pos: [21, 0, 6],
            match: ['return'],
            idx: 4,
            scope: [69],
            parseProblems: [],
            end: { pos: [21, 12, 0], match: [''] },
            kids: [
              {
                type: 1,
                name: 14,
                pos: [21, 6, 1],
                match: [','],
                idx: 0,
                scope: [69, 11],
                parseProblems: [],
              },
              {
                type: 1,
                name: 85,
                pos: [21, 8, 4],
                match: ['name'],
                idx: 1,
                scope: [69, 11],
                parseProblems: [],
              },
            ],
          },
        ],
      },
    ];

    // verify results
    expect(tokenized.tree).toEqual(expectedTree);

    // define expected problems
    const expectedProblems: SyntaxProblems = [];

    // verify results
    expect(
      tokenized.parseProblems.concat(tokenized.postProcessProblems)
    ).toEqual(expectedProblems);
  });
});