package com.sevenfold.aviar.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sevenfold.aviar.persistence.entity.Reserva;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

}
