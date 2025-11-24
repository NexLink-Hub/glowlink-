# GlowLink Beauty Platform - Deployment & Testing Guide

## Phase 6: Testing & CI/CD - Complete Setup

This document provides comprehensive instructions for testing, building, and deploying the GlowLink beauty platform.

## Testing

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once (CI mode)
npm run test:run

# Generate coverage report
npm run test:coverage

# Run tests with UI dashboard
npm run test:ui
```

### Test Structure

Tests are organized in `src/test/` with the following coverage:

- **Unit Tests**
  - `auth.test.ts` - Authentication and token management (localStorage operations)
  - `sanitize.test.ts` - Input sanitization and XSS prevention
  - `errorLogger.test.ts` - Error logging and reporting
  - `errorHandling.test.ts` - Async error handling, retries, timeouts

- **Integration Tests** (To add)
  - API hook integration with React Query
  - Service worker mocking with MSW
  - Full authentication flow

- **Component Tests** (To add)
  - ErrorBoundary error recovery
  - Loading skeletons and states
  - ProtectedRoute access control

- **Page Tests** (To add)
  - Search page filtering and data loading
  - Dashboard real-time updates
  - Profile booking flow

### Test Setup

- **Test Runner**: Vitest with happy-dom environment
- **Testing Library**: @testing-library/react
- **API Mocking**: MSW (Mock Service Worker)
- **Query Client**: Configured with retry=false, immediate cleanup
- **Coverage Threshold**: 70% (lines, functions, branches, statements)

### Adding New Tests

Use the provided test utilities in `src/test/test-utils.tsx`:

```tsx
import { render, screen } from "@/test/test-utils";
import { MyComponent } from "@/components/MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });
});
```

## Building

### Development Build

```bash
# Start dev server with hot reload
npm run dev

# Dev build (unoptimized, for testing)
npm run build:dev
```

### Production Build

```bash
# Create optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### Build Output

- **Location**: `dist/` directory
- **Size**: ~327 KB uncompressed, ~105 KB gzipped
- **Optimization**: Code splitting, lazy loading, tree shaking, minification

## Linting & Code Quality

```bash
# Run ESLint checks
npm run lint

# Fix linting errors automatically
npm run lint -- --fix
```

## Continuous Integration

### GitHub Actions Pipeline

The CI/CD pipeline (`.github/workflows/ci-cd.yml`) runs automatically on:
- **Pushes** to `main` or `develop` branches
- **Pull Requests** to `main` or `develop` branches

#### Pipeline Stages

1. **Tests** (parallel on Node 18.x & 20.x)
   - Run full test suite
   - Upload coverage to Codecov
   - Fail if tests fail

2. **Lint** (Node 20.x)
   - Run ESLint checks
   - Fail if linting errors found

3. **Build** (Node 20.x, depends on Tests & Lint)
   - Create production bundle
   - Upload build artifacts (retention: 1 day)
   - Fail if build fails

4. **Deploy** (depends on Build, only on push)
   - **Production**: Triggered on main branch push
   - **Preview**: Triggered on develop branch push

### Setting Up CI/CD Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

```
VERCEL_TOKEN          # Vercel authentication token
VERCEL_ORG_ID         # Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project ID
```

**Getting Vercel Tokens**:
1. Visit https://vercel.com/account/tokens
2. Create a new token
3. Copy and add to GitHub secrets

## Deployment

### Vercel Deployment

#### Automatic Deployment (GitHub Actions)

The pipeline automatically deploys to Vercel on:
- **main branch**: Production deployment
- **develop branch**: Preview deployment

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Deploy preview
vercel
```

#### Configuration

Vercel settings are in `vercel.json`:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Framework**: Vite
- **Install Command**: `npm ci`
- **Environment Variables**: Configured via Vercel dashboard

### Environment Variables

For Vercel deployments, set these environment variables in the Vercel dashboard:

```
VITE_API_URL=https://your-api.example.com/api
```

### Preview Deployments

- Automatically created for each `develop` branch push
- Unique URL generated for each deployment
- Separate from production
- Automatic cleanup after PR closes

## Deployment Checklist

- [ ] All tests passing locally (`npm run test:run`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables set in Vercel dashboard
- [ ] Vercel secrets configured in GitHub
- [ ] Feature branch tested on preview deployment
- [ ] PR reviewed and approved
- [ ] Merge to main triggers production deployment
- [ ] Verify production deployment is live

## Troubleshooting

### Tests Failing

```bash
# Clear cache and re-run
npm run test:run -- --clearCache

# Run specific test file
npm run test:run -- src/test/auth.test.ts

# Run with verbose output
npm run test:run -- --reporter=verbose
```

### Build Errors

```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install

# Rebuild
npm run build
```

### Deployment Issues

1. Check GitHub Actions logs: Actions tab on GitHub
2. Check Vercel logs: https://vercel.com/dashboard
3. Verify environment variables are set
4. Check that build artifacts uploaded successfully
5. Verify Vercel tokens are not expired

## Performance Monitoring

### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --analyze

# View generated dist structure
ls -lh dist/
```

### Expected Sizes

- Main bundle: ~327 KB
- Gzipped: ~105 KB
- Route chunks: 0.6-15 KB each

## Best Practices

1. **Before Committing**
   ```bash
   npm run lint -- --fix
   npm run test:run
   npm run build
   ```

2. **Branch Strategy**
   - `main`: Production-ready code
   - `develop`: Development/staging code
   - Feature branches: `feature/description`

3. **Commit Messages**
   - Use conventional commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`
   - Example: `feat: add user profile search`

4. **Pull Requests**
   - Require passing CI/CD checks
   - Require code review
   - Squash commits before merge

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
