# Your UI Library

This repository contains a collection of reusable UI components and hooks built with React and Tailwind CSS. It's designed to provide a consistent and accessible set of building blocks for your web applications.

## Installation

To use these components in your project, install the package via npm:

```bash
npm install dabi-ui
```

## Usage

Once installed, you can import and use any component or hook:

```typescript
import { Button } from "dabi-ui";
import { useToast } from "dabi-ui";

function MyComponent() {
  const { toast } = useToast();

  return (
    <Button onClick={() => toast("Hello from Toast!")}>Click Me</Button>
  );
}
```

## Components & Hooks

Here's an overview of the available components and hooks:

### Components

- `Alert`
- `Button`
- `ButtonGroup`
- `Card`
- `Checkbox`
- `Chip`
- `CommandMenu`
- `CommandMenuItem`
- `Confirm`
- `CopyButton`
- `DataTable`
- `Dialog`
- `Drawer`
- `Input`
- `Item`
- `Popover`
- `Separator`
- `Skeleton`
- `Toaster`
- `Tooltip`

### Hooks

- `useAlert`
- `useConfirm`
- `useToast`