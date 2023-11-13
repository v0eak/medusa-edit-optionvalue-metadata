<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Medusa Edit Optionvalue Metadata
</h1>

<p align="center">A plugin for editing the Metadata of a ProductOptionValue.</p>

## Compatibility
This plugin is compatible with versions >1.16.0 of `@medusajs/medusa`

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
![App Screenshot](https://github.com/v0eak/medusa-edit-optionvalue-metadata/assets/51446230/820e4491-dcf4-4443-a397-95c67218f4f6)