package com.sevenfold.aviar.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity(name = "distribucion_ave")
public class DistribucionAve {

    @EmbeddedId
    private DistribucionAveId id;
    @Column(length = 100)
    private String residencia;
    @Column(length = 100)
    private String abundancia;
    @ManyToOne
    @MapsId("especieId")
    @JoinColumn(name = "especie_id")
    private EspecieAve especie;
    @ManyToOne
    @MapsId("areaId")
    @JoinColumn(name = "area_id")
    private AreaProtegida area;
    
    public DistribucionAve() {}

    public DistribucionAve(DistribucionAveId id, String residencia, String abundancia, EspecieAve especie,
            AreaProtegida area) {
        this.id = id;
        this.residencia = residencia;
        this.abundancia = abundancia;
        this.especie = especie;
        this.area = area;
    }

    public DistribucionAveId getId() {
        return id;
    }

    public void setId(DistribucionAveId id) {
        this.id = id;
    }

    public String getResidencia() {
        return residencia;
    }

    public void setResidencia(String residencia) {
        this.residencia = residencia;
    }

    public String getAbundancia() {
        return abundancia;
    }

    public void setAbundancia(String abundancia) {
        this.abundancia = abundancia;
    }

    public EspecieAve getEspecie() {
        return especie;
    }

    public void setEspecie(EspecieAve especie) {
        this.especie = especie;
    }

    public AreaProtegida getArea() {
        return area;
    }

    public void setArea(AreaProtegida area) {
        this.area = area;
    }

}
