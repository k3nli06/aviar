package com.sevenfold.aviar.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sevenfold.aviar.persistence.entity.AreaProtegida;

@Repository
public interface AreaProtegidaRepository extends JpaRepository<AreaProtegida, Long> {
    Optional<AreaProtegida> findByNombre(String nombre);

}
