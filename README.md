# Neo Interactive CYOA Creator (NeoICC)

NeoICC is an ideological successor to the original Interactive CYOA Creator (ICC) created by MeanDelay. This project aims to provide a powerful and flexible CYOA creation tool with full backward compatibility and an open-source codebase.

## Features

- Fully open-source
- Backward compatible with ICC and ICC+ projects  
- Developed on Svelte and works more stable with large projects

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

To start the development server with the main interface:

```bash
npm run dev -- --open
```

This will open the application in your default browser.

### Building

The project has two build modes:

1. Main development interface:

```bash
npm run build
```

This will create a production build in the `build` folder.

2. Viewer mode (for viewing completed CYOA projects):

```bash
npm run build:viewer
```

This will create a production build for the viewer in the `build-viewer` folder. Works the same as before - just upload to the server and put project.json next to it.

## Future Plans

We are actively working on incorporating all the features from ICC+ into NeoICC and have plans to add even more exciting capabilities. Stay tuned for updates!

## Contributing

We welcome contributions from the community. Please feel free to submit issues, feature requests, or pull requests to help improve NeoICC.
