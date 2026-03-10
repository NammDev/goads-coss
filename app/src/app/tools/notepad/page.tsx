import type { Metadata } from "next"
import { NotepadContent } from "./notepad-content"

export const metadata: Metadata = {
  title: "Online Notepad | Quick Notes Tool",
  description: "Simple online notepad with auto-save. Free note-taking tool that persists in your browser.",
}

export default function NotepadPage() {
  return <NotepadContent />
}
