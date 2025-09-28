package com.sevenfold.aviar.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sevenfold.aviar.persistence.entity.EspecieAve;
import com.sevenfold.aviar.persistence.entity.Foto;
import com.sevenfold.aviar.persistence.repository.EspecieAveRepository;
import com.sevenfold.aviar.persistence.repository.FotoRepository;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class FotoService {

    @Autowired
    FotoRepository Frepository;
    @Autowired
    EspecieAveRepository Arepository;

    public Foto ObtenerFoto(Long id) {
        return Frepository.findById(id).get();
    }

    public boolean guardarFoto(Long id, MultipartFile file) throws IOException {
        Foto foto = new Foto(null, file.getBytes(), file.getContentType(), null);
        Optional<EspecieAve> ave = Arepository.findById(id);
        
        if (!ave.isPresent()) {
            return false;
        }
        foto.setAve(ave.get());
        Frepository.save(foto);
        return true;
    }
    
}
