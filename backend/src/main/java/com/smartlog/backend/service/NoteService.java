package com.smartlog.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.smartlog.backend.model.Note;

@Service
public class NoteService {
    private final List<Note> notes = new ArrayList<>();

    public Note createNote(Note note) {
        notes.add(note);
        return note;
    }

    public List<Note> getAllNotes() {
        return new ArrayList<>(notes);
    }

    public Note getNoteById(UUID id) {
        return notes.stream()
                .filter(note -> note.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
