package com.sevenfold.aviar.service;

import java.util.List;
import java.util.Optional;

import com.sevenfold.aviar.dto.*;

public interface EventoService {

    public List<EventosDto> obtenerEventos();
    public Optional<EventoDto> obtenerEvento(Long id);

}
