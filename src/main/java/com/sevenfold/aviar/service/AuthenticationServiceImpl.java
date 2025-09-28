package com.sevenfold.aviar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sevenfold.aviar.dto.LoginDto;
import com.sevenfold.aviar.dto.RegisterDto;
import com.sevenfold.aviar.dto.TokenResponse;
import com.sevenfold.aviar.persistence.entity.Rol;
import com.sevenfold.aviar.persistence.entity.Usuario;
import com.sevenfold.aviar.persistence.repository.PaisRepository;
import com.sevenfold.aviar.persistence.repository.UsuarioRepository;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    JwtService jwtService;
    AuthenticationManager authenticationManager;
    PasswordEncoder encoder;
    UsuarioRepository Urepository;
    PaisRepository Prepository;

    @Autowired
    public AuthenticationServiceImpl(JwtService jwtService, AuthenticationManager authenticationManager,
            PasswordEncoder encoder, UsuarioRepository urepository, PaisRepository Prepository) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.Urepository = urepository;
        this.Prepository = Prepository;
        this.encoder = encoder;
    }

    @Override
    public TokenResponse login(LoginDto login) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(login.correo(), login.claveHash()));
        Usuario usuario = Urepository.findByCorreo(login.correo()).get();
        return new TokenResponse(jwtService.getToken(usuario));
    }

    @Override
    public TokenResponse registrar(RegisterDto register) {
        Usuario registrado = new Usuario(null, register.correo(), null,
                register.nombreCompleto(), register.telefono());
        registrado.setClaveHash(encoder.encode(register.claveHash()));        
        registrado.setPaisId(Prepository.findByNombre(register.pais()).orElse(null));
        registrado.addRole(new Rol(1L, "ROLE_USUARIO", null));

        Urepository.save(registrado);
        return new TokenResponse(jwtService.getToken(registrado));
    }

}
