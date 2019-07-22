/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 */
import {IPanelProps} from './PanelProps';

export interface IGridProps extends IPanelProps {
  RowDefinitions?: string;
  ColumnDefinitions?: string;
  CornerRadius?: string;
  BorderBrush?: string;
  BorderThickness?: string;
}
