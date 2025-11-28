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
        noteRepository.deleteById(id);
    }

    public void updateNote(Note note) {
        noteRepository.save(note);
    }
    public String summarizeNote(UUID id) {

        Note note = getNoteById(id);
        if (note == null || note.getContent() == null || note.getContent().isEmpty()) {
            throw new RuntimeException("Note not found or content is empty");
        }
        String content = note.getContent();
        return content.length() <= 100 ? content : content.substring(0, 100) + "...";
    }
}
