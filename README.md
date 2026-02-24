# RivalBlog — Frontend

Frontend for RivalBlog, a fullstack blog platform. Built with Next.js 15 App Router and Tailwind CSS.

---

## 🔗 Links

| | URL |
|---|---|
| **Live App** | `https://rival-frontend.vercel.app/dashboard` |
| **Backend Repository** | `https://github.com/shevasatrian/rival-backend` |

---

## 🛠️ Tech Stack

- **Next.js 15** — App Router, Server & Client Components
- **TypeScript**
- **Tailwind CSS**
- **Axios** — HTTP client with JWT interceptor

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js >= 18
- Backend API running (see backend repository)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/rivalblog-frontend.git
cd rivalblog-frontend

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env.local
```

Fill in `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```bash
# 4. Start development server
npm run dev
```

App will run on `http://localhost:3000`.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home (redirects to feed)
│   ├── layout.tsx                # Root layout with Navbar
│   ├── feed/
│   │   └── page.tsx              # Public blog feed with pagination
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx          # Blog detail page
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── register/
│   │   └── page.tsx              # Register page
│   └── dashboard/
│       ├── layout.tsx            # Dashboard layout (auth guard)
│       ├── page.tsx              # My blogs list
│       ├── create/
│       │   └── page.tsx          # Create blog
│       └── edit/
│           └── [id]/
│               └── page.tsx      # Edit blog
├── components/
│   ├── Navbar.tsx
│   └── blog/
│       ├── LikeButton.tsx        # Toggle like/unlike
│       └── CommentSection.tsx    # Comments list & form
└── lib/
    ├── api.ts                    # Axios instance with JWT interceptor
    └── auth.ts                   # Login & register helpers
```

---

## 🏗️ Architecture Notes

**Server vs Client Components**

Pages that only display data (`feed`, `blog/[slug]`) are Server Components — they fetch data on the server for better performance and SEO. Interactive components (`LikeButton`, `CommentSection`, forms) are Client Components since they require state and user interaction.

**Authentication**

JWT is stored in `localStorage` and attached to every API request via an Axios interceptor in `lib/api.ts`. The dashboard layout checks for token presence on mount and redirects to `/login` if absent.

**Optimistic UI**

`LikeButton` uses optimistic updates — the count updates immediately on click and rolls back if the API request fails, making interactions feel instant.

---
