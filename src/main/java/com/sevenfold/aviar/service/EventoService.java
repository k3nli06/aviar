package com.sevenfold.aviar.service;

import java.util.List;
import java.util.Optional;

import com.sevenfold.aviar.dto.EventoDto;

public interface EventoService {

    public List<EventoDto> obtenerEventos();
    public Optional<EventoDto> obtenerEvento(Long id);

}
