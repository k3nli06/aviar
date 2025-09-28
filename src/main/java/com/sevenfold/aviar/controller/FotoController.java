package com.sevenfold.aviar.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sevenfold.aviar.persistence.entity.Foto;
import com.sevenfold.aviar.service.FotoService;

@RestController
@RequestMapping("/fotos")
@PreAuthorize("permitAll()")
public class FotoController {

    @Autowired
    FotoService service;

    @GetMapping("/{id}")
    public ResponseEntity<?> getFoto(@PathVariable Long Id) {
        
        Foto foto = service.ObtenerFoto(Id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, foto.getTipo())
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" +foto.getId().toString()+ "\"")    
                .body(foto.getImagen());
    }
    
    @PostMapping("/{aveId}")
    public ResponseEntity<?> subirfoto(@PathVariable Long aveId, @RequestParam MultipartFile foto) {
        try {
            if (service.guardarFoto(aveId, foto) == false) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ave no encontrada");
        } else if (foto.isEmpty()) {
            return ResponseEntity.badRequest().body("El archivo no puede estar vacio");
        }
        return ResponseEntity.created(null).build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al leer el archivo");
        }
    }

}
