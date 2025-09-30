package com.sevenfold.aviar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sevenfold.aviar.dto.ReservaDto;
import com.sevenfold.aviar.dto.ReservaRequest;
import com.sevenfold.aviar.persistence.entity.Reserva;
import com.sevenfold.aviar.persistence.repository.AreaProtegidaRepository;
import com.sevenfold.aviar.persistence.repository.GuiaRepository;
import com.sevenfold.aviar.persistence.repository.ReservaRepository;
import com.sevenfold.aviar.persistence.repository.UsuarioRepository;

@Service
public class ReservaServiceImpl implements ReservaService {

    ReservaRepository Rrepository;
    GuiaRepository Grepository;
    UsuarioRepository Urepository;
    AreaProtegidaRepository Arepository;

    @Autowired
    public ReservaServiceImpl(ReservaRepository rrepository, GuiaRepository grepository,
            UsuarioRepository urepository, AreaProtegidaRepository areposirory) {
        Rrepository = rrepository;
        Grepository = grepository;
        Urepository = urepository;
        Arepository = areposirory;
    }

    @Override
    public List<ReservaDto> ObtenerMisReservas(String email) {
        List<Reserva> reservas = Rrepository.findAllByUsuarioId(
                Urepository.findByCorreo(email).get().getId());

        return reservas.stream().map(
                reservado -> {
                    ReservaDto r = new ReservaDto(reservado.getId(), reservado.getGuia(), reservado.getArea().getId(),
                            reservado.getEstado(), reservado.getFechaInicio(), reservado.getFechaFin(),
                            reservado.getAdultos(),
                            reservado.getNinos(), reservado.getNotas(), reservado.getTotal(), reservado.getMoneda());
                    r.guia().setUsuario(null);
                    r.guia().setOperador(null);
                    return r;
                }).toList();
    }

    @Override
    public ReservaDto crearReserva(ReservaRequest reserva, String email) {
        Reserva reservado = Rrepository.save(
                new Reserva(null, Urepository.findByCorreo(email).get(),
                        Grepository.findById(reserva.guiaId()).get(), Arepository.findById(reserva.areaId()).get(),
                        "pendiente",
                        reserva.fechaInicio(), reserva.fechaFin(), reserva.adultos(), reserva.ninos(), reserva.notas(),
                        null,
                        null));
        ReservaDto dto = new ReservaDto(reservado.getId(), reservado.getGuia(), reservado.getArea().getId(),
                reservado.getEstado(), reservado.getFechaInicio(), reservado.getFechaFin(), reservado.getAdultos(),
                reservado.getNinos(), reservado.getNotas(), reservado.getTotal(), reservado.getMoneda());
        dto.guia().setUsuario(null);
        dto.guia().setOperador(null);
        return dto;
    }

    @Override
    public ReservaDto actualizarReserva(ReservaRequest reserva) {
        Reserva reservado = Rrepository.findById(reserva.id()).get();
        reservado.setGuia(Grepository.findById(reserva.guiaId()).get());
        reservado.setArea(Arepository.findById(reserva.areaId()).get());
        reservado.setFechaInicio(reserva.fechaInicio());
        reservado.setFechaFin(reserva.fechaFin());
        reservado.setAdultos(reserva.adultos());
        reservado.setNinos(reserva.ninos());
        reservado.setNotas(reserva.notas());
        Rrepository.save(reservado);
        ReservaDto r = new ReservaDto(reservado.getId(), reservado.getGuia(), reservado.getArea().getId(),
                reservado.getEstado(), reservado.getFechaInicio(), reservado.getFechaFin(), reservado.getAdultos(),
                reservado.getNinos(), reservado.getNotas(), reservado.getTotal(), reservado.getMoneda());
        r.guia().setUsuario(null);
        r.guia().setOperador(null);
        return r;
    }

    @Override
    public void confirmarReserva(Long id) {
        Reserva reserva = Rrepository.findById(id).get();
        reserva.setEstado("confirmado");
        Rrepository.save(reserva);
    }

}
