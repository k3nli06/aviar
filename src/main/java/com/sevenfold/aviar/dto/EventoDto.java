package com.sevenfold.aviar.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.sevenfold.aviar.persistence.entity.Moneda;
import com.sevenfold.aviar.persistence.entity.Operador;

public record EventoDto(Long id, Long areaId, Operador operador, String tipo, String titulo, String descripcion,
        LocalDateTime fechaInicio, LocalDateTime fechaFin, BigDecimal precio, Moneda moneda) {
}
