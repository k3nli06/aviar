package com.sevenfold.aviar.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sevenfold.aviar.dto.EventoDto;
import com.sevenfold.aviar.service.EventoService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/eventos")
@PreAuthorize("isAuthenticated()")
public class EventoController {

    @Autowired
    EventoService service;

    @GetMapping
    public ResponseEntity<?> getEventos() {
        return ResponseEntity.ok().body(service.obtenerEventos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEvento(@PathVariable Long id) {
        Optional<EventoDto> evento = service.obtenerEvento(id);
        if (!evento.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(evento);
    }
    

}
