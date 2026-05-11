I found the issue: the Microsoft connectors are linked and secrets are available, but the deployed backend endpoint returns `404 Requested function was not found`. That means the new `office-embed-url` Edge Function exists in the codebase but has not been deployed to Lovable Cloud, so the app cannot reach it.

Plan:
1. Deploy the `office-embed-url` Edge Function so `/functions/v1/office-embed-url` exists in the live backend.
2. Verify the endpoint no longer returns `404` from the preview domain.
3. Test the connector gateway for Word, Excel, and PowerPoint credentials.
4. If the function then returns a Microsoft sharing/permission error, adjust the function error handling and fallback links so the UI shows the exact Microsoft issue instead of the generic “Failed to send request”.

Technical details:
- No frontend redesign is needed.
- No connector re-linking is needed unless Microsoft returns an auth/scope error after deployment.
- The current failure happens before Word/Excel/PowerPoint API logic runs, because the Edge Function is missing in the deployed backend.