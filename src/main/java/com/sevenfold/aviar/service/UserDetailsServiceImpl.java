package com.sevenfold.aviar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sevenfold.aviar.persistence.repository.UsuarioRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UsuarioRepository repository;

    public UserDetails loadUserByUsername(String correo) {
        return repository.findByCorreo(correo).orElseThrow(() -> new UsernameNotFoundException("usuario con el correo "+correo+" no encontrado"));
    }

}
