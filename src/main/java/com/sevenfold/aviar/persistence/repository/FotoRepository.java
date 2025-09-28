package com.sevenfold.aviar.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sevenfold.aviar.persistence.entity.Foto;

@Repository
public interface FotoRepository extends JpaRepository<Foto, Long> {

}
