package com.sevenfold.aviar.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sevenfold.aviar.persistence.entity.Idioma;

@Repository
public interface IdiomaRepository extends JpaRepository<Idioma, String> {
    Optional<Idioma> findByNombre(String nombre);

}
