package com.sevenfold.aviar.dto;

import java.util.List;

public record AveDto(String nombreCientifico, String nombreComunEs, String nombreComunEn, String descripcionEs,
        String DescripcionEn, List<FotoDto> fotos) {

}
