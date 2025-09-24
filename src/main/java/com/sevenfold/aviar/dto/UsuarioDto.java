package com.sevenfold.aviar.dto;

import java.util.Set;

import com.sevenfold.aviar.persistence.entity.Rol;

public record UsuarioDto(Long id, String correo, String nombreCompleto, Set<Rol> roles,
        String telefono, String pais) {

}
