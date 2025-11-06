package com.sevenfold.aviar.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sevenfold.aviar.dto.UsuarioDto;
import com.sevenfold.aviar.service.UsuarioService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/users")
public class controller {

    @Autowired
    UsuarioService service;

    @GetMapping
    public List<UsuarioDto> getUsuarios() {
        return service.getAllUsers();
    }

    @GetMapping("/{id}")
    public UsuarioDto getUsuarioById(@PathVariable Long id) {
        return service.getUserById(id).get();
    }

    @PutMapping
    public void putMethodName(@RequestBody UsuarioDto dto) {        
        service.updateUser(dto);
    }

    @DeleteMapping("{id}")
    public boolean deleteById(@PathVariable Long id) {
        return service.deleteById(id);
    }

}
