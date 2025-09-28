package com.sevenfold.aviar.service;

import java.util.List;

import com.sevenfold.aviar.dto.ReservaDto;
import com.sevenfold.aviar.dto.ReservaRequest;

public interface ReservaService {

    public List<ReservaDto> ObtenerMisReservas(String email);
    public ReservaDto crearReserva(ReservaRequest reserva, String email);
    public ReservaDto actualizarReserva(ReservaRequest reserva);
    public void confirmarReserva(Long id);

}
