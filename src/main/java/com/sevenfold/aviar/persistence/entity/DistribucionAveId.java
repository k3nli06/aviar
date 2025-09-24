package com.sevenfold.aviar.persistence.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class DistribucionAveId implements Serializable {

    @Column(name = "especie_id")
    private Long especieId;
    @Column(name = "are_id")
    private Long areaId;
    
    public DistribucionAveId() {}

    public DistribucionAveId(Long especieId, Long areaId) {
        this.especieId = especieId;
        this.areaId = areaId;
    }

    public Long getEspecieId() {
        return especieId;
    }

    public void setEspecieId(Long especieId) {
        this.especieId = especieId;
    }

    public Long getAreaId() {
        return areaId;
    }

    public void setAreaId(Long areaId) {
        this.areaId = areaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DistribucionAveId that = (DistribucionAveId) o;
        return Objects.equals(especieId, that.especieId) &&
               Objects.equals(areaId, that.areaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(especieId, areaId);
    }
}
