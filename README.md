
# Supabase Integration

This project uses Supabase for backend functionality.

## Environment Variables

Copy `.env.example` to a new file called `.env` and fill in your Supabase project details:

```sh
cp .env.example .env
```

Then edit the `.env` file with your Supabase project URL and anon key:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

You can find these values in your Supabase project dashboard under Settings > API.

## Development

After setting up your environment variables, you can run the development server:

```sh
npm run dev
```

The application will use your Supabase credentials for authentication and data operations.

## Running Tests

This project includes both unit tests and end-to-end tests:

### Unit Tests

Run all unit tests:

```sh
npm run test:unit
```

Run unit tests in watch mode:

```sh
npm run test:unit:watch
```

Generate coverage report:

```sh
npm run test:unit:coverage
```

### End-to-End Tests

Run E2E tests in headless mode:

```sh
npm run test:e2e
```

Run E2E tests with UI:

```sh
npm run test:e2e:ui
```

### Run All Tests

Execute both unit and E2E tests:

```sh
npm test
```

## Code Quality

### Type Checking

Perform TypeScript type checking:

```sh
npm run typecheck
```

### Linting

Run ESLint to check code quality:

```sh
npm run lint
```

## Continuous Integration

This project uses GitHub Actions for CI/CD. The workflows are defined in `.github/workflows/ci.yml`.

The CI pipeline includes:
- Type checking
- Linting
- Building
- Running unit tests
- Running E2E tests

## Storybook

This project uses Storybook for component development and documentation.

### Running Storybook

Start the Storybook development server:

```sh
npm run storybook
```

Then open your browser at `http://localhost:6006`.

### Building Storybook

Generate a static Storybook site:

```sh
npm run build-storybook
```

The output will be in the `storybook-static` directory.

## Project Structure

- `src/components`: UI components
- `src/pages`: Application pages
- `src/hooks`: React hooks
- `src/context`: React context providers
- `src/lib`: Utility functions
- `src/services`: API service functions
- `src/test`: Test setup and utilities
- `.github/workflows`: CI/CD workflows
