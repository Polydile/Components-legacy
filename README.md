# Dile Components V2

This is the "dile-components" catalog monorepo, a library of Custom Elements based on Lit and Web Components.

To utilize this component library, follow these steps.

## Packages in This Repository

- `@dile/ui`: Components for creating common User Interfaces, such as buttons, dialogs, custom form elements, etc.
- `@dile/utils`: Components that provide useful functionalities for web development.
- `@dile/icons`: Templates for implementing SVG icons within your components.
- `@dile/editor`: A Markdown WYSIWYG (What You See Is What You Get) editor for the web.

## Installation

To use this component catalog, you need to install the repository where the desired component is located. For instance, to use the UI custom elements, install `@dile/ui`:

```bash
npm install @dile/ui
```

## Component usage

To utilize a component from this library, you must import the element you need. For example, to use the toast feedback element, use the following import:

```javascript
import '@dile/ui/components/toast/toast';
```

After importing, you can use the component in your application like so:

```html
<dile-toast></dile-toast>
```

## Comming soon

More documentation will be available soon. Currently, you can find a complete list of the custom elements, along with their properties, methods, events, and examples on the previous version's website for dile-components: [https://dile-components.polydile.com/](https://dile-components.polydile.com/).

