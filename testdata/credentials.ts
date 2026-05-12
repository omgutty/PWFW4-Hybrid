
// testdata/credentials.ts

// Reads credentials from environment variables loaded by dotenv.
// Never hardcode values here — values come from config/.env locally
// and from GitHub Secrets on CI.

export const credentials = {
 username: process.env['ADMIN_EMAIL']    ?? '',
  password: process.env['ADMIN_PASSWORD'] ?? '',
}

// Validate at load time — fail immediately if credentials are missing
// instead of failing later with a confusing "invalid login" error
if (!credentials.username || !credentials.password) {
  throw new Error(
    '\n[Config Error] username or password is not set.\n' +
    'Add them to config/.env\n'
  )
}