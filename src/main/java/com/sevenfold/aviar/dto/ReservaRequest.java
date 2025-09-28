package com.sevenfold.aviar.dto;

import java.time.LocalDateTime;

public record ReservaRequest(Long id, Long areaId , LocalDateTime fechaInicio, LocalDateTime fechaFin, int adultos, int ninos, String notas, Long guiaId) {

}
