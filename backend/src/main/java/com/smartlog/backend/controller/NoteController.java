package com.smartlog.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartlog.backend.model.Note;
import com.smartlog.backend.service.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return noteService.createNote(note);
    }

    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable UUID id) {
        return noteService.getNoteById(id);
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable UUID id, @RequestBody Note note) {
        Note existingNote = noteService.getNoteById(id);
        if (existingNote == null) {
            throw new RuntimeException("Note not found");
        }
        existingNote.setTitle(note.getTitle());
        existingNote.setContent(note.getContent());
        return existingNote;
    }
}