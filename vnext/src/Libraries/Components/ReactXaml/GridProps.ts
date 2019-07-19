/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 */
import {ViewProps} from 'react-native';

export interface IGridProps extends ViewProps {
  RowDefinitions?: string;
  ColumnDefinitions?: string;
}
