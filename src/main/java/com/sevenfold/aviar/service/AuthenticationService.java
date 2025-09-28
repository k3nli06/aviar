package com.sevenfold.aviar.service;

import com.sevenfold.aviar.dto.LoginDto;
import com.sevenfold.aviar.dto.RegisterDto;
import com.sevenfold.aviar.dto.TokenResponse;

public interface AuthenticationService {

    TokenResponse login(LoginDto login);

    TokenResponse registrar(RegisterDto register);

}