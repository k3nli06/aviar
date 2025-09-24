package com.sevenfold.aviar.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sevenfold.aviar.persistence.entity.Region;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {
    Optional<Region> findByNombre(String nombre);

}
