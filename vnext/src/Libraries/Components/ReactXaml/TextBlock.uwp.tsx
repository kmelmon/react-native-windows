/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 */
'use strict';

import * as React from 'react';
import {requireNativeComponent} from 'react-native';
import {ITextBlockProps} from './TextBlockProps';

/*
const styles = StyleSheet.create({
  rctFlyout: {
    position: 'absolute',
  },
});
*/

const RCTTextBlock = requireNativeComponent('RCTTextBlock');

export class TextBlock extends React.Component<ITextBlockProps> {
  constructor(props: ITextBlockProps) {
    super(props);
  }

  public render(): JSX.Element {
    const props = {...this.props};

    return <RCTTextBlock {...props} />;
  }
}

export default TextBlock;
