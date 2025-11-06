package com.sevenfold.aviar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sevenfold.aviar.service.AreaService;

@RestController
@RequestMapping("/area-protegida")
@PreAuthorize("isAuthenticated()")
public class AreaController {

    @Autowired
    AreaService service;

    @GetMapping
    public ResponseEntity<?> getAreas() {
        return ResponseEntity.ok().body(service.obtenerAreas());
    }
    
}
