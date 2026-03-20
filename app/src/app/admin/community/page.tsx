import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AdminDataTable } from "@/components/dashboard/admin-data-table"
import { getReports, getPostStats, getPosts } from "@/lib/db/queries/community-queries"
import { adminReportColumns } from "@/components/dashboard/columns/admin-report-columns"
import { adminCommunityPostColumns } from "@/components/dashboard/columns/admin-community-post-columns"
import { AdminReportActions } from "./admin-report-actions"
import { AdminPostActions } from "./admin-post-actions"
import type { ReportRow } from "@/components/dashboard/columns/admin-report-columns"
import type { PostRow } from "@/components/dashboard/columns/admin-community-post-columns"

export default async function AdminCommunityPage() {
  const [reports, stats, postsResult] = await Promise.all([
    getReports(),
    getPostStats(),
    getPosts({ limit: 100 }),
  ])

  const openCount = reports.filter((r) => r.report.status === "open").length

  // Serialize reports for client table
  const reportRows: ReportRow[] = reports.map((r) => ({
    id: r.report.id,
    reporterName: r.reporterName ?? "Unknown",
    reason: r.report.reason,
    details: r.report.details,
    postId: r.report.postId,
    replyId: r.report.replyId,
    status: r.report.status,
    createdAt: r.report.createdAt.toISOString(),
  }))

  // Serialize posts for client table
  const postRows: PostRow[] = postsResult.posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    authorName: p.authorName,
    categoryName: p.categoryName,
    status: p.status,
    isPinned: p.isPinned,
    isHidden: p.isHidden,
    upvotesCount: p.upvotesCount,
    repliesCount: p.repliesCount,
    viewsCount: p.viewsCount,
    createdAt: p.createdAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Community Moderation</h1>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{stats.totalPosts} posts</span>
          <span>{stats.totalReplies} replies</span>
          <span>{stats.solvedCount} solved</span>
        </div>
      </div>

      <Tabs defaultValue="reports">
        <TabsList>
          <TabsTrigger value="reports" className="gap-1.5">
            Reports
            {openCount > 0 && (
              <Badge variant="destructive" className="ml-1 px-1.5 py-0 text-[10px]">
                {openCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="mt-4">
          <AdminDataTable
            data={reportRows}
            columns={adminReportColumns}
            searchPlaceholder="Search reports..."
            searchColumn="reporterName"
            renderExpandedRow={(row) => <AdminReportActions report={row} />}
            emptyState={
              <p className="py-8 text-center text-muted-foreground">No reports. Community is clean!</p>
            }
          />
        </TabsContent>

        <TabsContent value="posts" className="mt-4">
          <AdminDataTable
            data={postRows}
            columns={adminCommunityPostColumns}
            searchPlaceholder="Search posts..."
            searchColumn="title"
            renderExpandedRow={(row) => <AdminPostActions post={row} />}
            emptyState={
              <p className="py-8 text-center text-muted-foreground">No community posts yet.</p>
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
