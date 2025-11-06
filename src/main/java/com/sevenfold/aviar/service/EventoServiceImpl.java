package com.sevenfold.aviar.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sevenfold.aviar.dto.*;
import com.sevenfold.aviar.persistence.entity.Evento;
import com.sevenfold.aviar.persistence.repository.EventoRepository;

@Service
public class EventoServiceImpl implements EventoService {

    @Autowired
    EventoRepository repository;

    @Override
    public List<EventosDto> obtenerEventos() {
        List<Evento> eventos = repository.findAll();
        return eventos.stream().map(
            e -> new EventosDto(e.getId(), e.getTitulo(), e.getDescripcion(), e.getFechaInicio(), e.getFechaFin())
        ).toList();
    }

    @Override
    public Optional<EventoDto> obtenerEvento(Long id) {
        Evento evento = repository.findById(id).orElse(null);
        if (evento == null) {
            return Optional.empty();
        }
        return Optional.of(new EventoDto(id, evento.getArea().getId(), evento.getOperador(), evento.getTipo(), evento.getTitulo(),
                evento.getDescripcion(), evento.getFechaInicio(), evento.getFechaFin(), evento.getPrecio(),
                evento.getMoneda()));
    }

}
