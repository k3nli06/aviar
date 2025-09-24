package com.sevenfold.aviar.persistence.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "especie_ave")
public class EspecieAve {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nombre_cientifico", length = 200, unique = true, nullable = false)
    private String nombreCientifico;
    @Column(name = "nombre_comun_es", length = 200)
    private String nombreComunEs;
    @Column(name = "nombre_comun_en", length = 200)
    private String nombreComunEn;
    @Column(length = 100)
    private String orden;
    @Column(length = 100)
    private String familia;
    @Column(length = 100)
    private String genero;
    private boolean endemica;
    private boolean migratoria;
    @Column(name = "longitud_cm", precision = 5, scale = 2)
    private BigDecimal longitudCm;
    @Column(name = "peso_g", precision = 7, scale = 2)
    private BigDecimal pesoG;
    @ManyToOne
    @JoinColumn(name = "estado_conservacion_id")
    private EstadoConservacion estadoConservacion;
    @Column(name = "descripcion_es")
    private String descripcionEs;
    @Column(name = "descripcion_en")
    private String descripcionEn;
    
    public EspecieAve() {}

    public EspecieAve(Long id, String nombreCientifico, String nombreComunEs, String nombreComunEn, String orden, String familia,
            String genero, boolean endemica, boolean migratoria, BigDecimal longitudCm, BigDecimal pesoG,
            EstadoConservacion estadoConservacion, String descripcionEs, String descripcionEn) {
        this.id = id;
        this.nombreCientifico = nombreCientifico;
        this.nombreComunEs = nombreComunEs;
        this.nombreComunEn = nombreComunEn;
        this.orden = orden;
        this.familia = familia;
        this.genero = genero;
        this.endemica = endemica;
        this.migratoria = migratoria;
        this.longitudCm = longitudCm;
        this.pesoG = pesoG;
        this.estadoConservacion = estadoConservacion;
        this.descripcionEs = descripcionEs;
        this.descripcionEn = descripcionEn;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreCientifico() {
        return nombreCientifico;
    }

    public void setNombreCientifico(String nombreCientifico) {
        this.nombreCientifico = nombreCientifico;
    }

    public String getNombreComunEs() {
        return nombreComunEs;
    }

    public void setNombreComunEs(String nombreComunEs) {
        this.nombreComunEs = nombreComunEs;
    }

    public String getNombreComunEn() {
        return nombreComunEn;
    }

    public void setNombreComunEn(String nombreComunEn) {
        this.nombreComunEn = nombreComunEn;
    }

    public String getOrden() {
        return orden;
    }

    public void setOrden(String orden) {
        this.orden = orden;
    }

    public String getFamilia() {
        return familia;
    }

    public void setFamilia(String familia) {
        this.familia = familia;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public boolean isEndemica() {
        return endemica;
    }

    public void setEndemica(boolean endemica) {
        this.endemica = endemica;
    }

    public boolean isMigratoria() {
        return migratoria;
    }

    public void setMigratoria(boolean migratoria) {
        this.migratoria = migratoria;
    }

    public BigDecimal getLongitudCm() {
        return longitudCm;
    }

    public void setLongitudCm(BigDecimal longitudCm) {
        this.longitudCm = longitudCm;
    }

    public BigDecimal getPesoG() {
        return pesoG;
    }

    public void setPesoG(BigDecimal pesoG) {
        this.pesoG = pesoG;
    }

    public EstadoConservacion getEstadoConservacion() {
        return estadoConservacion;
    }

    public void setEstadoConservacion(EstadoConservacion estadoConservacion) {
        this.estadoConservacion = estadoConservacion;
    }

    public String getDescripcionEs() {
        return descripcionEs;
    }

    public void setDescripcionEs(String descripcionEs) {
        this.descripcionEs = descripcionEs;
    }

    public String getDescripcionEn() {
        return descripcionEn;
    }

    public void setDescripcionEn(String descripcionEn) {
        this.descripcionEn = descripcionEn;
    }
    
}
