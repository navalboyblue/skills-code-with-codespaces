import { GetExtensionPath } from '@idl/shared';
import { OpenNotebookInVSCode } from '@idl/vscode/shared';
import * as vscode from 'vscode';

import { RunnerFunction } from '../runner.interface';
import { CompareCellKindsAndOutputs } from './helpers/compare-cells';
import { ICompareCellAndOutputs } from './helpers/compare-cells.interface';

/**
 * Types of outputs from cells that we expect to have
 */
export const CELL_OUTPUT: ICompareCellAndOutputs[] = [
  {
    idx: 0,
    kind: vscode.NotebookCellKind.Code,
    outputs: [],
  },
  {
    idx: 1,
    kind: vscode.NotebookCellKind.Code,
    outputs: [],
  },
  {
    idx: 2,
    kind: vscode.NotebookCellKind.Code,
    outputs: ['text/plain'],
  },
  {
    idx: 3,
    kind: vscode.NotebookCellKind.Code,
    outputs: ['text/html'],
  },
  {
    idx: 4,
    kind: vscode.NotebookCellKind.Code,
    outputs: ['text/html'],
  },
  {
    idx: 5,
    kind: vscode.NotebookCellKind.Code,
    outputs: ['text/html'],
  },
  {
    idx: 6,
    kind: vscode.NotebookCellKind.Code,
    outputs: ['text/html'],
  },
  {
    idx: 7,
    kind: vscode.NotebookCellKind.Code,
    outputs: ['text/html'],
  },
  {
    idx: 8,
    kind: vscode.NotebookCellKind.Code,
    outputs: ['text/html'],
  },
  {
    idx: 9,
    kind: vscode.NotebookCellKind.Code,
    outputs: ['text/html'],
  },
  {
    idx: 10,
    kind: vscode.NotebookCellKind.Code,
    outputs: ['text/html'],
  },
  {
    idx: 11,
    kind: vscode.NotebookCellKind.Code,
    outputs: ['text/html'],
  },
];

/**
 * Function that verifies that we can open notebooks in the format 2.0.0
 */
export const NotebookFormats_2_0_0: RunnerFunction = async (init) => {
  /**
   * Get the file we are going to open
   */
  const file = GetExtensionPath(
    'idl/test/client-e2e/notebooks/test-2.0.0.idlnb'
  );

  /**
   * Open the notebook
   */
  const nb = await OpenNotebookInVSCode(file);

  // compare state
  CompareCellKindsAndOutputs(nb, CELL_OUTPUT);
};
