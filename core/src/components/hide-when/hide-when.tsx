import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { Config, Mode, PlatformConfig } from '../../index';

import {
  DisplayWhen,
  updateTestResults,
} from '../../utils/show-hide-when-utils';

@Component({
  tag: 'ion-hide-when',
  styleUrl: './hide-when.scss'
})
export class HideWhen implements DisplayWhen {

  mode!: Mode;

  @Element() element!: HTMLElement;
  @Prop({ context: 'config' }) config!: Config;
  @Prop({ context: 'platforms' }) calculatedPlatforms!: PlatformConfig[];

  @Prop() orientation?: string;
  @Prop() mediaQuery?: string;
  @Prop() size?: string;
  @Prop() platform?: string;
  @Prop() or = false;

  @State() passesTest = false;

  @Listen('window:resize')
  componentWillLoad() {
    return updateTestResults(this);
  }

  hostData() {
    return {
      class: {
        'show-content': !this.passesTest,
        'hide-content': this.passesTest
      }
    };
  }
}
