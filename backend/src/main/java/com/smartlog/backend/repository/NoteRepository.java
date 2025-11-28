package com.smartlog.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartlog.backend.model.Note;

public interface NoteRepository extends JpaRepository<Note, UUID> {
    
}
