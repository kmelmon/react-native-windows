/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 */
'use strict';

import * as React from 'react';
import {requireNativeComponent} from 'react-native';
import {IStackPanelProps} from './StackPanelProps';

/*
const styles = StyleSheet.create({
  rctFlyout: {
    position: 'absolute',
  },
});
*/

const RCTStackPanel = requireNativeComponent('RCTStackPanel');

export class StackPanel extends React.Component<IStackPanelProps> {
  constructor(props: IStackPanelProps) {
    super(props);
  }

  public render(): JSX.Element {
    const props = {...this.props};

    return <RCTStackPanel {...props} />;
  }
}

export default StackPanel;
