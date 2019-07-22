/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 */
'use strict';

import * as React from 'react';
import {requireNativeComponent} from 'react-native';
import {IRectangleProps} from './RectangleProps';

/*
const styles = StyleSheet.create({
  rctFlyout: {
    position: 'absolute',
  },
});
*/

const RCTRectangle = requireNativeComponent('RCTRectangle');

export class Rectangle extends React.Component<IRectangleProps> {
  constructor(props: IRectangleProps) {
    super(props);
  }

  public render(): JSX.Element {
    const props = {...this.props};

    return <RCTRectangle {...props} />;
  }
}

export default Rectangle;
