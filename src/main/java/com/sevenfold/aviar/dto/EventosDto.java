package com.sevenfold.aviar.dto;

import java.time.LocalDateTime;

public record EventosDto(Long id, String titulo, String descripcion, LocalDateTime fechaIn, LocalDateTime fechaFin) {
}