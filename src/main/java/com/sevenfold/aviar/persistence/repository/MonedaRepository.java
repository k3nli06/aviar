package com.sevenfold.aviar.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sevenfold.aviar.persistence.entity.Moneda;

@Repository
public interface MonedaRepository extends JpaRepository<Moneda, String> {
    Optional<Moneda> findByNombre(String nombre);

}
