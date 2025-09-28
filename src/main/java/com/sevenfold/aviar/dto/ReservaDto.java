package com.sevenfold.aviar.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.sevenfold.aviar.persistence.entity.Guia;
import com.sevenfold.aviar.persistence.entity.Moneda;

public record ReservaDto(Long id, Guia guia, Long area, String estado,
            LocalDateTime fechaInicio, LocalDateTime fechaFin, int adultos, int ninos, String notas, BigDecimal total,
            Moneda moneda) {

}
