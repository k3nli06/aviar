package com.sevenfold.aviar.service;

import java.util.List;
import java.util.Optional;

import com.sevenfold.aviar.dto.AveDto;
import com.sevenfold.aviar.persistence.entity.EspecieAve;

public interface AveService {

    public Optional<EspecieAve> obtenerAvePorId(Long id);
    public Optional<EspecieAve> obtenerAvePorNombreCientifico(String nombre);
    public Optional<EspecieAve> obtenerAvePorNombreComun(String nombre);
    public List<AveDto> obtenerAves();
    public List<AveDto> obtenerAvesPorOrden(String orden);
    public List<AveDto> obtenerAvesPorFamilia(String familia);
    public List<AveDto> obtenerAvesPorGenero(String genero);

}
