"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";

import { ToolPageShell } from "@/app/tools/layout";
import { ToolsSidebarMobile } from "@/components/tools-sidebar";
import { ToolTextarea } from "@/components/tool-textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "goads-notepad";

type Note = { id: string; title: string; content: string };

function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function NotepadContent() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [saved, setSaved] = useState(false);

  // Load on mount
  useEffect(() => {
    const loaded = loadNotes();
    if (loaded.length === 0) {
      const first: Note = { id: "1", title: "Note 1", content: "" };
      setNotes([first]);
      setActiveId(first.id);
    } else {
      setNotes(loaded);
      setActiveId(loaded[0].id);
    }
  }, []);

  const activeNote = notes.find((n) => n.id === activeId);

  const persist = useCallback(
    (updated: Note[]) => {
      setNotes(updated);
      saveNotes(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    },
    []
  );

  const updateContent = (content: string) => {
    const updated = notes.map((n) =>
      n.id === activeId ? { ...n, content } : n
    );
    persist(updated);
  };

  const updateTitle = (title: string) => {
    const updated = notes.map((n) =>
      n.id === activeId ? { ...n, title } : n
    );
    persist(updated);
  };

  const addNote = () => {
    const id = Date.now().toString();
    const note: Note = { id, title: `Note ${notes.length + 1}`, content: "" };
    persist([...notes, note]);
    setActiveId(id);
  };

  const deleteNote = () => {
    if (notes.length <= 1) return;
    const updated = notes.filter((n) => n.id !== activeId);
    persist(updated);
    setActiveId(updated[0].id);
  };

  return (
    <ToolPageShell>
      <div className="space-y-6">
        <div>
          <ToolsSidebarMobile />
          <h1 className="text-2xl font-semibold">Online Notepad</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Quick notes saved in your browser
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => setActiveId(note.id)}
              className={`shrink-0 rounded-t-md border border-b-0 px-3 py-1.5 text-sm transition-colors ${
                activeId === note.id
                  ? "bg-background text-foreground font-medium"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {note.title}
            </button>
          ))}
          <Button variant="ghost" size="sm" onClick={addNote}>
            <Plus className="size-3.5" />
          </Button>
        </div>

        {/* Active note */}
        {activeNote && (
          <div className="space-y-3">
            <Input
              value={activeNote.title}
              onChange={(e) => updateTitle(e.target.value)}
              className="h-8 w-48 text-sm font-medium"
            />
            <ToolTextarea
              value={activeNote.content}
              onChange={updateContent}
              placeholder="Type your notes here..."
              rows={16}
              showLineCount={false}
            />
          </div>
        )}

        {/* Status bar */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            {saved && (
              <>
                <Check className="size-3 text-success" />
                Auto-saved
              </>
            )}
          </span>
          {notes.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive gap-1"
              onClick={deleteNote}
            >
              <Trash2 className="size-3" />
              Delete note
            </Button>
          )}
        </div>
      </div>
    </ToolPageShell>
  );
}
