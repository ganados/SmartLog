package com.smartlog.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartlog.backend.model.Note;
import com.smartlog.backend.repository.NoteRepository;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public Note createNote(Note note) {
        noteRepository.save(note);
        return note;
    }

    public List<Note> getAllNotes() {
        List<Note> notes = noteRepository.findAll();
        return new ArrayList<>(notes);
    }

    public Note getNoteById(UUID id) {
        return noteRepository.findById(id).orElse(null);
    }

    public void deleteNote(UUID id) {
        Note existingNote = getNoteById(id);
        if (existingNote == null) {
            throw new RuntimeException("Note not found");
        }
        noteRepository.deleteById(id);
    }

    public Note updateNote(UUID id, Note note) {
        Note existingNote = getNoteById(id);
        if (existingNote == null) {
            throw new RuntimeException("Note not found");
        }
        existingNote.setTitle(note.getTitle());
        existingNote.setContent(note.getContent());
        noteRepository.save(existingNote);
        return existingNote;
    }

    public String summarizeNote(UUID id) {
        Note note = getNoteById(id);
        if (note == null || note.getContent() == null || note.getContent().isEmpty()) {
            throw new RuntimeException("Note not found or content is empty");
        }
        String content = note.getContent();

        String[] sentences = content.split("(?<=[.!?])\\s+");
        StringBuilder summary = new StringBuilder();
        for (int i = 0; i < Math.min(3, sentences.length); i++) {
            summary.append(sentences[i].trim()).append(" ");
        }

        if (sentences.length > 3) {
            summary.append("...");
        }

        return summary.toString().trim();
    }
}
