package com.sevenfold.aviar.persistence.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sevenfold.aviar.persistence.entity.EspecieAve;

@Repository
public interface EspecieAveRepository extends JpaRepository<EspecieAve, Long> {
    Optional<EspecieAve> findByNombreCientifico(String nombreCientifico);
    Optional<EspecieAve> findByNombreComunEs(String nombreComunEs);
    Optional<EspecieAve> findByNombreComunEn(String nombreComunEn);
    List<EspecieAve> findAllByOrden(String orden);
    List<EspecieAve> findAllByFamilia(String familia);
    List<EspecieAve> findAllByGenero(String genero);

}
