# cf-image-to-alt-text

Using Cloudflare AI for SEO to take any image and create alt text for it

# Setup

```
npm install
```

# Run Dev

```
npm run dev
```

# Test Locally

You can change the image to anything on the web btw :)

```
curl -X POST http://localhost:8787/api/v1/image \
-H "Content-Type: application/json" \
-d '{
  "url": "https://www.johnmurch.com/assets/img/john-murch.jpg"
}'
```
