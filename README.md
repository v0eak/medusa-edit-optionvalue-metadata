# medusa-edit-optionvalue-metadata
A plugin for editing the Metadata of a ProductOptionValue made explicitly for [medusajs/admin](https://github.com/medusajs/admin).

## Requirements
This plugin will most likely run with older versions too, but these dependency versions are guaranteed to work.
```bash
  "@medusajs/medusa": "^1.16.0",
  "@medusajs/admin": "^7.1.1",
  "@medusajs/ui": "^1.0.0",
  "react": "^18.2.0"
```

## Getting Started
Installation
```bash
  yarn add medusa-edit-optionvalue-metadata
  OR
  npm install medusa-edit-optionvalue-metadata
```

Add to medusa-config.js
```bash
  ///...other plugins
  {
    resolve: 'medusa-edit-optionvalue-metadata',
    options: {
      enableUI: true,
    },
  },
```

Start the server
```bash
  medusa develop
```


## Screenshots
![App Screenshot](https://github.com/git-Veak/medusa-edit-optionvalue-metadata/assets/51446230/93bff6bc-2237-4628-b553-73f8511fc732)