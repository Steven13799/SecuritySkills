// BENIGN — secrets-management
// Expected: NO leaked-credential finding. These keys are public by design;
// their security comes from domain/referer/scope restrictions, not secrecy.
// At most they are informational. Flagging any of them as a leaked secret is a
// false positive (see SKILL.md 2.2 item 3: public-by-design keys).

const firebaseConfig = {
  apiKey: "AIzaSyD-1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7", // Firebase Web apiKey (public)
  authDomain: "demo-app.firebaseapp.com",
  projectId: "demo-app",
};

const stripe = Stripe("pk_live_51HscJpKx9aQwErTyUiOpAsDfGhJkLzXcVbNm0011"); // publishable

Sentry.init({ dsn: "https://abcdef0123456789@o123456.ingest.sentry.io/123" }); // public DSN

const algolia = algoliasearch("APPID123", "9f8e7d6c5b4a39281706f5e4d3c2b1a0"); // search-only key

// Non-secret high-entropy shapes that the entropy heuristic must NOT flag:
const sri = "sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC";
const commit = "9f1c2e4b7a8d3f6019e2c5b4a7d80f3c1e6b9a24"; // 40-hex git SHA
const uuid = "550e8400-e29b-41d4-a716-446655440000";       // RFC-4122 UUID

module.exports = { firebaseConfig, sri, commit, uuid };
