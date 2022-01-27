// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// NOTE - if you only need Firebase for a database (with no real-time or auth) you could use API routes and avoid including Firebase on the frontend

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
