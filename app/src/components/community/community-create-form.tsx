"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createPost } from "@/lib/actions/community-actions"
import { toast } from "sonner"

interface Category {
  id: string
  name: string
}

interface CommunityCreateFormProps {
  categories: Category[]
}

export function CommunityCreateForm({ categories }: CommunityCreateFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !body.trim() || !categoryId) return

    startTransition(async () => {
      const result = await createPost({
        title: title.trim(),
        body: body.trim(),
        categoryId,
      })
      if (result.success && result.slug) {
        toast.success("Post created!")
        router.push(`/portal/community/${result.slug}`)
      } else {
        toast.error(result.error ?? "Failed to create post")
      }
    })
  }

  const isValid = title.trim().length >= 5 && body.trim().length >= 10 && categoryId

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="category">Category</Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          required
          minLength={5}
        />
        <p className="text-xs text-muted-foreground">{title.length}/200</p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="body">Body</Label>
        <Textarea
          id="body"
          placeholder="Describe your question, idea, or feedback in detail..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          required
          minLength={10}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending || !isValid}>
          {isPending ? "Creating..." : "Create Post"}
        </Button>
      </div>
    </form>
  )
}
