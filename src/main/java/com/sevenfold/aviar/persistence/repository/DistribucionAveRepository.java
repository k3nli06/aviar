package com.sevenfold.aviar.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sevenfold.aviar.persistence.entity.DistribucionAve;
import com.sevenfold.aviar.persistence.entity.DistribucionAveId;

@Repository
public interface DistribucionAveRepository extends JpaRepository<DistribucionAve, DistribucionAveId> {

}
