package com.sevenfold.aviar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sevenfold.aviar.dto.AreasDto;
import com.sevenfold.aviar.persistence.repository.AreaProtegidaRepository;

@Service
public class AreaServiceImpl implements AreaService {

    @Autowired
    AreaProtegidaRepository repository;

    @Override
    public List<AreasDto> obtenerAreas() {
        List<AreasDto> areas = repository.findAll().stream().map(
            a -> new AreasDto(a.getId(), a.getNombre(), a.getDescripcion(), a.getSitioWeb())
        ).toList();
        
        return areas;
    }
    
}
