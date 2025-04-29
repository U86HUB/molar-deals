
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
