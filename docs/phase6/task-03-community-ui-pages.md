---
status: pending
created: 2026-03-20
depends-on: task-02
branch: feature/community
---

# Task 3 — Discussion Board UI Pages

> Build community discussion board pages: listing, detail, and create post form.

---

## Context

- Backend complete: 7 tables, 8 queries, 12 server actions (Task 1-2)
- Portal layout: `PortalShell` with sidebar + header, Clerk auth
- Existing pattern: Blog listing (category sidebar + post grid) + Blog detail (TOC sidebar + content)
- Container: `mx-auto max-w-[1416px] px-4 lg:px-6`
- Design: oklch palette, Geist font, 4-tier button system, Framer Motion animations
- Community routes live under portal: `/portal/community/*`

---

## Key Backend APIs

### Queries (`community-queries.ts`)

| Function | Returns | Used On |
|----------|---------|---------|
| `getCategories()` | `CommunityCategory[]` | Listing sidebar |
| `getPosts({ categorySlug?, sort?, page?, limit? })` | `{ posts: PostWithAuthor[], total }` | Listing page |
| `getPostBySlug(slug, userId?)` | `PostDetail \| null` | Detail page |
| `searchPosts(query, limit?)` | `PostWithAuthor[]` | Search bar |
| `getMostHelpful(limit?)` | `LeaderboardEntry[]` | Listing sidebar |

### Actions (`community-actions.ts`)

| Action | Params | Used On |
|--------|--------|---------|
| `createPost(data)` | `{ title, body, categoryId }` → `{ success, slug? }` | Create form |
| `createReply(data)` | `{ postId, body }` → `{ success }` | Detail reply form |
| `toggleUpvote({ targetType, targetId })` | post/reply + id | Detail page buttons |
| `toggleSubscription(postId)` | postId | Detail page |
| `recordView(postId)` | postId | Detail page (on mount) |
| `markSolution(postId, replyId)` | ids | Detail page (author only) |
| `reportContent(data)` | `{ targetType, targetId, reason }` | Detail page dropdown |

---

## Files to Create

| File | Purpose | ~LOC |
|------|---------|------|
| `src/app/(portal)/community/page.tsx` | Listing page (SSR) | ~60 |
| `src/app/(portal)/community/[slug]/page.tsx` | Detail page (SSR) | ~70 |
| `src/app/(portal)/community/create/page.tsx` | Create post page | ~30 |
| `src/components/community/community-post-list.tsx` | Post cards list + pagination | ~120 |
| `src/components/community/community-post-card.tsx` | Single post card | ~80 |
| `src/components/community/community-sidebar.tsx` | Category nav + leaderboard + stats | ~100 |
| `src/components/community/community-post-detail.tsx` | Post body + metadata + actions | ~120 |
| `src/components/community/community-reply-list.tsx` | Replies list | ~80 |
| `src/components/community/community-reply-item.tsx` | Single reply card | ~70 |
| `src/components/community/community-reply-form.tsx` | Reply textarea + submit | ~60 |
| `src/components/community/community-create-form.tsx` | Title + body + category select | ~120 |
| `src/components/community/community-search-bar.tsx` | Search input with debounce | ~50 |
| `src/components/community/community-sort-tabs.tsx` | Recent / Top / Trending tabs | ~40 |
| `src/components/community/community-upvote-button.tsx` | Upvote toggle (client) | ~50 |

## Files to Modify

| File | Change |
|------|--------|
| `src/data/portal-nav.ts` | Add Community nav item with icon |

---

## Architecture

### Route Structure

```
(portal)/community/
├── page.tsx              → Listing (categories + posts + search + sort)
├── create/page.tsx       → New post form (auth required)
└── [slug]/page.tsx       → Post detail (body + replies + actions)
```

### Page Layouts

**Listing Page** — 2-column (desktop), 1-column (mobile)
```
┌──────────────────────────────────────────────┐
│ Header: "Community" + search bar + create btn │
├────────────┬─────────────────────────────────┤
│ Sidebar    │ Sort tabs (Recent|Top|Trending) │
│ ─────────  │ ─────────────────────────────── │
│ Categories │ PostCard                         │
│  • General │ PostCard                         │
│  • Meta    │ PostCard                         │
│  • Google  │ ...                              │
│ ─────────  │ ─────────────────────────────── │
│ Leaderboard│ Pagination                       │
├────────────┴─────────────────────────────────┤
│ (no footer — portal layout handles it)        │
└──────────────────────────────────────────────┘
```

**Detail Page** — full-width content
```
┌──────────────────────────────────────────────┐
│ Breadcrumb: Community > Category > Post Title │
├──────────────────────────────────────────────┤
│ Post title + status badge + pin badge         │
│ Author avatar + name + date + view count      │
│ Post body (prose)                             │
│ Action bar: upvote | subscribe | share | report│
├──────────────────────────────────────────────┤
│ Replies (N)                                   │
│ ┌─ ReplyItem (avatar + name + body + upvote) │
│ │  [✅ Solution badge if marked]              │
│ ├─ ReplyItem                                  │
│ └─ ...                                        │
├──────────────────────────────────────────────┤
│ Reply form (textarea + submit)                │
└──────────────────────────────────────────────┘
```

### Data Flow

```
Listing: page.tsx (SSR)
  → getCategories() + getPosts({ categorySlug, sort, page })
  → pass to CommunitySidebar + CommunityPostList
  → URL search params for category/sort/page (no client state)

Detail: [slug]/page.tsx (SSR)
  → getPostBySlug(slug, userId) + recordView(postId)
  → pass to CommunityPostDetail + CommunityReplyList
  → Client components: UpvoteButton, ReplyForm, SubscribeButton

Create: create/page.tsx
  → getCategories() for select dropdown
  → CommunityCreateForm (client) → createPost action → redirect to /community/[slug]
```

### Client vs Server Components

| Component | Type | Why |
|-----------|------|-----|
| page.tsx (all 3) | Server | SSR data fetching |
| CommunitySidebar | Server | Static category list |
| CommunityPostList | Server | Rendered from SSR data |
| CommunityPostCard | Server | No interactivity |
| CommunityPostDetail | Server | Prose content |
| CommunityReplyList | Server | List of replies |
| CommunityReplyItem | Server | Display only (upvote is separate) |
| CommunityUpvoteButton | **Client** | `useTransition` + optimistic UI |
| CommunityReplyForm | **Client** | Form state + submission |
| CommunityCreateForm | **Client** | Form state + rich editor |
| CommunitySearchBar | **Client** | Debounced input + URL push |
| CommunitySortTabs | **Client** | URL param switching |

---

## Implementation Steps

### Step 1: Portal Nav Update
1. Add `{ title: "Community", href: "/community", icon: MessagesSquare }` to portal nav config

### Step 2: Listing Page Components
1. Create `community-sidebar.tsx` — category links (active = bold), leaderboard widget
2. Create `community-post-card.tsx` — title, excerpt, author, upvotes, replies count, status badge, time ago
3. Create `community-sort-tabs.tsx` — 3 tabs pushing `?sort=` search param
4. Create `community-search-bar.tsx` — input with 300ms debounce pushing `?q=` param
5. Create `community-post-list.tsx` — maps PostWithAuthor[] → PostCard + pagination controls

### Step 3: Listing Page Assembly
1. Create `(portal)/community/page.tsx`
2. Read searchParams: `categorySlug`, `sort`, `page`, `q`
3. Call `getCategories()` + `getPosts(opts)` or `searchPosts(q)` based on params
4. Render sidebar + sort tabs + search + post list + pagination
5. `generateMetadata()` for SEO

### Step 4: Detail Page Components
1. Create `community-upvote-button.tsx` — client, optimistic count, calls `toggleUpvote`
2. Create `community-reply-item.tsx` — avatar, name, body, time, upvote, solution badge
3. Create `community-reply-list.tsx` — sorted replies, solution pinned to top
4. Create `community-reply-form.tsx` — client, textarea + submit, calls `createReply`, revalidates
5. Create `community-post-detail.tsx` — full post with action bar (upvote, subscribe, report dropdown)

### Step 5: Detail Page Assembly
1. Create `(portal)/community/[slug]/page.tsx`
2. Call `getPostBySlug(slug, userId)`, 404 if null
3. Call `recordView(postId)` server-side
4. Render breadcrumb + post detail + reply list + reply form
5. `generateMetadata()` from post title/body

### Step 6: Create Post Page
1. Create `community-create-form.tsx` — client, title input + body textarea + category select
2. Form validation: title required (5-200 chars), body required (10+ chars), category required
3. On submit: call `createPost`, redirect to `/community/${slug}` on success
4. Create `(portal)/community/create/page.tsx` — auth check + form

### Step 7: Polish & Integration
1. Loading states: skeleton cards on listing, skeleton on detail
2. Empty states: "No posts yet" + CTA to create
3. Error handling: toast on action failures
4. Mobile responsive: sidebar collapses, cards stack

---

## Todo List

- [ ] Add Community to portal nav config
- [ ] `community-sidebar.tsx` — categories + leaderboard
- [ ] `community-post-card.tsx` — post preview card
- [ ] `community-sort-tabs.tsx` — sort param tabs
- [ ] `community-search-bar.tsx` — debounced search
- [ ] `community-post-list.tsx` — card list + pagination
- [ ] `(portal)/community/page.tsx` — listing page
- [ ] `community-upvote-button.tsx` — optimistic upvote
- [ ] `community-reply-item.tsx` — reply card
- [ ] `community-reply-list.tsx` — reply list
- [ ] `community-reply-form.tsx` — reply form
- [ ] `community-post-detail.tsx` — full post view
- [ ] `(portal)/community/[slug]/page.tsx` — detail page
- [ ] `community-create-form.tsx` — new post form
- [ ] `(portal)/community/create/page.tsx` — create page
- [ ] Loading skeletons + empty states
- [ ] Mobile responsive pass
- [ ] Compile check (`pnpm build`)

---

## Success Criteria

- `/portal/community` shows paginated posts with category filter + sort + search
- `/portal/community/[slug]` shows full post + replies with working upvote/reply
- `/portal/community/create` allows authenticated users to create posts
- All pages SSR with proper metadata
- Mobile responsive (sidebar hidden on mobile, cards stack)
- No TypeScript errors, compiles clean

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Pagination complexity | Use URL search params, server-side offset/limit |
| Optimistic UI for upvotes | `useOptimistic` hook, revert on error |
| Rich text editor bloat | Start with plain textarea, upgrade later if needed |
| Slow queries on large data | Queries already use indexed columns + limit |

---

## Security Considerations

- All write actions already auth-gated via Clerk in server actions
- `recordView` deduplicates by userId
- `reportContent` validates reason enum server-side
- Post creation requires authenticated user
- XSS: post body rendered as text (not HTML), or sanitized if markdown

---

## Next Steps

- Task 4: Portal integration (sidebar nav, auth-gated posting, notifications)
- Task 5-6: User profiles (link author names to profile pages)
- Task 7-8: Moderation tools (admin page for reports/flags)
