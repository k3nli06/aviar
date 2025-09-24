package com.sevenfold.aviar.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sevenfold.aviar.persistence.entity.EstadoConservacion;

@Repository
public interface EstadoConservacionRepository extends JpaRepository<EstadoConservacion, Long> {

}
