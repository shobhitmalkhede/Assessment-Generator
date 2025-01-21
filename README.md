# Assessment Generator

This project is a web application designed to generate and manage assessments, built using modern web development tools and frameworks.

## Features
- **Custom Components**: Modular components for reusable UI.
- **Tailwind CSS**: For easy and flexible styling.
- **TypeScript Support**: Ensures type safety.
- **Next.js**: A powerful React framework for server-side rendering and static site generation.
- **Hooks**: Custom React hooks for shared functionality.
- **Dynamic Configuration**: Supports dynamic configuration via `next.config.mjs`.

## Folder Structure
- `app/`: Contains application pages and logic.
- `components/`: Reusable UI components.
- `hooks/`: Custom React hooks.
- `lib/`: Shared utility functions and libraries.
- `public/`: Static assets like images, icons, etc.
- `styles/`: Global and component-specific styles.
- `types/`: TypeScript type definitions.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd assessment-generator
   ```

2. **Install Dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) installed.
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

4. **Build for Production**:
   To create an optimized build for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Start the Production Server**:
   ```bash
   npm start
   # or
   yarn start
   ```

## Configuration

### Tailwind CSS
Tailwind configuration can be customized in `tailwind.config.ts`.

### Environment Variables
Add environment variables in a `.env.local` file at the root of the project.

## Dependencies

The project dependencies are defined in `package.json`. Run `npm install` or `yarn install` to install them.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## License
This project is licensed under [MIT License](LICENSE).

## Acknowledgments
- Thanks to the open-source community for their amazing tools and libraries.
