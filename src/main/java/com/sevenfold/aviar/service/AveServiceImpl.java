package com.sevenfold.aviar.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sevenfold.aviar.dto.AveDto;
import com.sevenfold.aviar.dto.FotoDto;
import com.sevenfold.aviar.persistence.entity.EspecieAve;
import com.sevenfold.aviar.persistence.repository.EspecieAveRepository;

@Service
public class AveServiceImpl implements AveService {

    @Autowired
    EspecieAveRepository repository;

    @Override
    public Optional<EspecieAve> obtenerAvePorId(Long id) {
        Optional<EspecieAve> ave = repository.findById(id);
        if (!ave.isPresent()) {
            return Optional.empty();
        }
        return ave;
    }

    @Override
    public Optional<EspecieAve> obtenerAvePorNombreCientifico(String nombre) {
        Optional<EspecieAve> ave = repository.findByNombreCientifico(nombre);
        if (!ave.isPresent()) {
            return Optional.empty();
        }
        return ave;
    }

    @Override
    public Optional<EspecieAve> obtenerAvePorNombreComun(String nombre) {
        Optional<EspecieAve> ave = repository.findByNombreComunEsOrNombreComunEn(nombre, nombre);
        if (!ave.isPresent()) {
            return Optional.empty();
        }
        return ave;
    }

    @Override
    public List<AveDto> obtenerAves() {
        List<EspecieAve> aves = repository.findAll();
        if (aves.isEmpty()) {
            return List.of();
        }
        return aves.stream().map(
            ave -> {
                List<FotoDto> fotos = ave.getFotos().stream().map(f -> new FotoDto(f.getId(), f.getTipo())).toList();
                return new AveDto(ave.getNombreCientifico(), ave.getNombreComunEs(), ave.getNombreComunEn(), ave.getDescripcionEs(), ave.getDescripcionEn(), fotos);
            }
        ).toList();
    }

    @Override
    public List<AveDto> obtenerAvesPorOrden(String orden) {
        List<EspecieAve> aves = repository.findAllByOrden(orden);
        if (aves.isEmpty()) {
            return List.of();
        }
        return aves.stream().map(
            ave -> {
                List<FotoDto> fotos = ave.getFotos().stream().map(f -> new FotoDto(f.getId(), f.getTipo())).toList();
                return new AveDto(ave.getNombreCientifico(), ave.getNombreComunEs(), ave.getNombreComunEn(), ave.getDescripcionEs(), ave.getDescripcionEn(), fotos);
            }
        ).toList();
    }

    @Override
    public List<AveDto> obtenerAvesPorFamilia(String familia) {
        List<EspecieAve> aves = repository.findAllByFamilia(familia);
        if (aves.isEmpty()) {
            return List.of();
        }
        return aves.stream().map(
            ave -> {
                List<FotoDto> fotos = ave.getFotos().stream().map(f -> new FotoDto(f.getId(), f.getTipo())).toList();
                return new AveDto(ave.getNombreCientifico(), ave.getNombreComunEs(), ave.getNombreComunEn(), ave.getDescripcionEs(), ave.getDescripcionEn(), fotos);
            }
        ).toList();
    }

    @Override
    public List<AveDto> obtenerAvesPorGenero(String genero) {
        List<EspecieAve> aves = repository.findAllByGenero(genero);
        if (aves.isEmpty()) {
            return List.of();
        }
        return aves.stream().map(
            ave -> {
                List<FotoDto> fotos = ave.getFotos().stream().map(f -> new FotoDto(f.getId(), f.getTipo())).toList();
                return new AveDto(ave.getNombreCientifico(), ave.getNombreComunEs(), ave.getNombreComunEn(), ave.getDescripcionEs(), ave.getDescripcionEn(), fotos);
            }
        ).toList();
    }

}
