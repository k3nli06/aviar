package com.sevenfold.aviar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sevenfold.aviar.dto.ReservaDto;
import com.sevenfold.aviar.dto.ReservaRequest;
import com.sevenfold.aviar.service.ReservaService;

@RestController
@RequestMapping("/reserva")
@PreAuthorize("isAuthenticated()")
public class ReservaController {

    @Autowired
    ReservaService service;

    @GetMapping("/mis-reservas")
    public ResponseEntity<?> getMisReservas() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok().body(service.ObtenerMisReservas(email));
    }

    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody ReservaRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        ReservaDto reserva = service.crearReserva(request, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(reserva);
    }

    @PutMapping
    public ResponseEntity<?> actualizarReserva(@RequestBody ReservaRequest request) {
        ReservaDto reserva = service.actualizarReserva(request);
        return ResponseEntity.ok(reserva);
    }

    @PutMapping("{id}")
    public ResponseEntity<?> confirmarReserva(@PathVariable long id) {
        service.confirmarReserva(id);
        return ResponseEntity.ok().build();
    }

}
