import { LitElement, html, css } from 'lit';
import { arrowDropDownIcon } from '@dile/icons';
import '@dile/ui/components/icon/icon';

const iconNames = {
  arrowDropDown: arrowDropDownIcon
}

export class DileIconName extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
      }
    `
  ];

  static get properties() {
    return {
      icon: { type: String },
    };
  }

  render() {
    return html`<dile-icon .icon="${iconNames[this.icon]}"></dile-icon>`;
  }
}
customElements.define('dile-icon-name', DileIconName);
