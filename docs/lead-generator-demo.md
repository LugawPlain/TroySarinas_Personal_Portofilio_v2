# Lead Generator Demo

The project detail page renders the lead generator when a project has `demo_type = lead-generator`.

## Environment variables

Set these in `.env.local` and in the production deployment:

```text
N8N_LEAD_GENERATOR_WEBHOOK=https://your-n8n-host/webhook/lead-generator
N8N_LEAD_CALLBACK_SECRET=use-a-long-random-secret
```

Apply the migration in `supabase/migrations/20260822000000_add_lead_generator_demo.sql` before enabling the demo project.

## n8n contract

The start endpoint sends this JSON to the n8n webhook:

```json
{
  "request_id": "uuid",
  "project_id": "uuid",
  "query": "dentists",
  "location": "Austin, TX",
  "max_results": 10,
  "callback_url": "https://your-site.com/api/lead-generator/callback"
}
```

The workflow can still write a backup copy to Google Sheets. It must also call `callback_url` when finished with:

```http
POST /api/lead-generator/callback
Authorization: Bearer use-a-long-random-secret
Content-Type: application/json
```

Successful callback:

```json
{
  "request_id": "uuid",
  "status": "complete",
  "results": [
    {
      "name": "Example Dental",
      "category": "Dentist",
      "address": "123 Main St, Austin, TX",
      "phone": "+1 555 0100",
      "website": "https://example.com",
      "rating": 4.7
    }
  ]
}
```

Failed callback:

```json
{
  "request_id": "uuid",
  "status": "failed",
  "error": "Search provider failed"
}
```

The UI displays at most 10 results and polls until the request is complete. Requests are removed after one day when `expire_lead_generator_requests()` is scheduled in Supabase.
