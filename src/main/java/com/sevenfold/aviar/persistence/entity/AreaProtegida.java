package com.sevenfold.aviar.persistence.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CurrentTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity(name = "area_protegida")
public class AreaProtegida {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 200, nullable = false, unique = true)
    private String nombre;
    @Column(length = 100, nullable = false)
    private String categoria;
    private String descripcion;
    @OneToOne
    @JoinColumn(name = "pais_id")
    private Pais pais;
    @OneToOne
    @JoinColumn(name = "region_id")
    private Region region;
    @OneToOne
    @JoinColumn(name = "ciudad_id")
    private Ciudad ciudad;
    @Column(precision = 9, scale = 6)
    private BigDecimal lat;
    @Column(precision = 9, scale = 6)
    private BigDecimal lon;
    @Column(name = "altitud_m")
    private int altitudM;
    @Column(name = "area_km2", precision = 10, scale = 2)
    private BigDecimal areaKM2;
    @Column(name = "sitio_web")
    private String sitioWeb;
    private boolean habilitada;
    @Column(name = "creado_en")
    @CurrentTimestamp
    private LocalDateTime creadoEn;
    
    public AreaProtegida() {}

    public AreaProtegida(Long id, String nombre, String categoria, String descripcion, Pais pais, Region region, Ciudad ciudad,
            BigDecimal lat, BigDecimal lon, int altitudM, BigDecimal areaKM2, String sitioWeb, boolean habilitada) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.pais = pais;
        this.region = region;
        this.ciudad = ciudad;
        this.lat = lat;
        this.lon = lon;
        this.altitudM = altitudM;
        this.areaKM2 = areaKM2;
        this.sitioWeb = sitioWeb;
        this.habilitada = habilitada;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Pais getPais() {
        return pais;
    }

    public void setPais(Pais pais) {
        this.pais = pais;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public Ciudad getCiudad() {
        return ciudad;
    }

    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }

    public BigDecimal getLat() {
        return lat;
    }

    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }

    public BigDecimal getLon() {
        return lon;
    }

    public void setLon(BigDecimal lon) {
        this.lon = lon;
    }

    public int getAltitudM() {
        return altitudM;
    }

    public void setAltitudM(int altitudM) {
        this.altitudM = altitudM;
    }

    public BigDecimal getAreaKM2() {
        return areaKM2;
    }

    public void setAreaKM2(BigDecimal areaKM2) {
        this.areaKM2 = areaKM2;
    }

    public String getSitioWeb() {
        return sitioWeb;
    }

    public void setSitioWeb(String sitioWeb) {
        this.sitioWeb = sitioWeb;
    }

    public boolean isHabilitada() {
        return habilitada;
    }

    public void setHabilitada(boolean habilitada) {
        this.habilitada = habilitada;
    }

    public LocalDateTime getCreadoEn() {
        return creadoEn;
    }

    public void setCreadoEn(LocalDateTime creadoEn) {
        this.creadoEn = creadoEn;
    }

}
