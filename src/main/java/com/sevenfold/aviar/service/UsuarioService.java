package com.sevenfold.aviar.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sevenfold.aviar.dto.UsuarioDto;
import com.sevenfold.aviar.persistence.entity.Usuario;
import com.sevenfold.aviar.persistence.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository repository;

    public List<UsuarioDto> getAllUsers() {
        return repository.findAll().stream().map(
            user -> new UsuarioDto(user.getId(), user.getCorreo(), user.getNombreCompleto(), user.getRoles(), user.getTelefono(), user.getPaisId().getNombre())
            ).toList();
    }
    
    public Optional<UsuarioDto> getUserById(Long id) {
        Usuario usuario = repository.findById(id).orElse(null);
        return Optional.of(new UsuarioDto(id, usuario.getCorreo(), usuario.getNombreCompleto(), usuario.getRoles(), usuario.getTelefono(), usuario.getPaisId().getNombre()));
    }

    public void updateUser(UsuarioDto usuario) {
        Usuario guardado = repository.findById(usuario.id()).get();
        guardado.setNombreCompleto(usuario.nombreCompleto());
        guardado.setCorreo(usuario.correo());
        guardado.setTelefono(usuario.telefono());
        repository.save(guardado);
    }

    public boolean deleteById(Long id) {
        Usuario u = repository.findById(id).orElse(null);
        if (u == null) {
            return false;
        }
        repository.delete(u);
        return true;
    }


}
