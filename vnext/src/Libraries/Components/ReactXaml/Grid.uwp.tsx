/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 */
'use strict';

import * as React from 'react';
import {requireNativeComponent} from 'react-native';
import {IGridProps} from './GridProps';

/*
const styles = StyleSheet.create({
  rctFlyout: {
    position: 'absolute',
  },
});
*/

const RCTGrid = requireNativeComponent('RCTGrid');

export class Grid extends React.Component<IGridProps> {
  constructor(props: IGridProps) {
    super(props);
  }

  public render(): JSX.Element {
    const props = {...this.props};

    return <RCTGrid {...props} />;
  }
}

export default Grid;
