package com.sevenfold.aviar.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sevenfold.aviar.dto.LoginDto;
import com.sevenfold.aviar.dto.RegisterDto;
import com.sevenfold.aviar.service.AuthenticationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    AuthenticationService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto login) {        
        return ResponseEntity.ok().body(service.login(login));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto register) {        
        return ResponseEntity.ok().body(service.registrar(register));
    }
    

}
