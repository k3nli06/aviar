package com.sevenfold.aviar.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sevenfold.aviar.dto.AveDto;
import com.sevenfold.aviar.persistence.entity.EspecieAve;
import com.sevenfold.aviar.service.AveService;

@RestController
@RequestMapping("/aves")
@PreAuthorize("permitAll()")
public class AveController {

    @Autowired
    AveService service;

    @GetMapping
    public ResponseEntity<?> getAves() {
        return ResponseEntity.ok().body(service.obtenerAves());
    }

    @GetMapping(params = "orden")
    public ResponseEntity<?> getAvesPorOrden(@RequestParam String orden) {
        List<AveDto> aves = service.obtenerAvesPorOrden(orden);
        if (aves.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(aves);
    }

    @GetMapping(params = "familia")
    public ResponseEntity<?> getAvesPorFamilia(@RequestParam String familia) {
        List<AveDto> aves = service.obtenerAvesPorOrden(familia);
        if (aves.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(aves);
    }

    @GetMapping(params = "genero")
    public ResponseEntity<?> getAvesPorgenero(@RequestParam String genero) {
        List<AveDto> aves = service.obtenerAvesPorOrden(genero);
        if (aves.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(aves);
    }

    @GetMapping(params = "id")
    public ResponseEntity<?> getAvePorId(@RequestParam Long id) {
        Optional<EspecieAve> ave = service.obtenerAvePorId(id);
        if (!ave.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(ave);
    }

    @GetMapping(params = "nombreComun")
    public ResponseEntity<?> getAvePorNombreComun(@RequestParam String nombreComun) {
        Optional<EspecieAve> ave = service.obtenerAvePorNombreCientifico(nombreComun);
        if (!ave.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(ave);
    }

}
