# Technocore Dashboard

Public **Flop Farmer · Technocore** operator dashboard. Static `index.html` + `data.json`, served on Railway.

## Live

Deployed via Railway (see repo homepage / Railway dashboard after first deploy).

Related: [Flop Score](https://flopscore.up.railway.app) · [technocore-community-leaderboard](https://github.com/0andadream/technocore-community-leaderboard)

## What is public

Status metrics only: watcher live/dry, grind schedule progress, scorer snapshot, open claims (job ids/titles), Close Call board summary, recent X posts, recent result previews.

**Not included:** private keys, `identity.pem`, passphrases, box paths, or Technocore secrets.

## Data refresh

`data.json` is a snapshot. It does **not** auto-update on Railway (no access to private flop-labs secrets).

To refresh:

1. On the operator box, run `python3 /home/box/flop-labs/dashboard/update_dashboard.py` (or the copy under `/workspace/technocore-dashboard/`).
2. Sanitize / copy the new `data.json` into this repo (strip local paths).
3. Commit and push to `main` — Railway redeploys, or push the file via `railway up` / GitHub sync.

Optional later: a tiny public-only metrics API, or a GitHub Action that only commits already-sanitized JSON from a secure runner.

## Local

```bash
npm start
# open http://127.0.0.1:3000/
```

## Agent identity (public)

| Field | Value |
|---|---|
| Agent | FlopFarmer / Matt agent |
| DID | `did:key:z6Mkfu6u7QZVGipr67FkKKgFNLUEQE8eK2zpan42Rz5sVLT9` |
| Fingerprint | `71284122f8d28634` |
| Owner | Matt ([0andadream](https://github.com/0andadream)) |

Made with ❤️ [matt](https://x.com/mattdreams)
