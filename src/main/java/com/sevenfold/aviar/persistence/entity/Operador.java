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

@Entity
public class Operador {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "usuario_id", unique = true)
    private Usuario usuario;
    @Column(name = "razon_social", length = 200, nullable = false)
    private String razonSocial;
    @Column(name = "nombre_comercial", length = 200)
    private String nombreComercial;
    @Column(length = 50, unique = true)
    private String ruc;
    @Column(length = 50)
    private String telefomno;
    @Column(length = 150)
    private String correo;
    @Column(name = "sitio_web")
    private String sitioWeb;
    @OneToOne
    @JoinColumn(name = "pais_id")
    private Pais pais;
    @OneToOne
    @JoinColumn(name = "ciudad_id")
    private Ciudad ciudad;
    @Column(name = "calificacion_prom", precision = 3, scale = 2)
    private BigDecimal calificacionProm;
    @Column(name = "total_resenas")
    private int totalResenas;
    private boolean certificado;
    @Column(name = "creado_en")
    @CurrentTimestamp
    private LocalDateTime creadoEn;
    
    public Operador() {}

    public Operador(long id, Usuario usuario, String razonSocial, String nombreComercial, String ruc, String telefomno,
            String correo, String sitioWeb, Pais pais, Ciudad ciudad, BigDecimal calificacionProm, int totalResenas,
            boolean certificado) {
        this.id = id;
        this.usuario = usuario;
        this.razonSocial = razonSocial;
        this.nombreComercial = nombreComercial;
        this.ruc = ruc;
        this.telefomno = telefomno;
        this.correo = correo;
        this.sitioWeb = sitioWeb;
        this.pais = pais;
        this.ciudad = ciudad;
        this.calificacionProm = calificacionProm;
        this.totalResenas = totalResenas;
        this.certificado = certificado;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getNombreComercial() {
        return nombreComercial;
    }

    public void setNombreComercial(String nombreComercial) {
        this.nombreComercial = nombreComercial;
    }

    public String getRuc() {
        return ruc;
    }

    public void setRuc(String ruc) {
        this.ruc = ruc;
    }

    public String getTelefomno() {
        return telefomno;
    }

    public void setTelefomno(String telefomno) {
        this.telefomno = telefomno;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getSitioWeb() {
        return sitioWeb;
    }

    public void setSitioWeb(String sitioWeb) {
        this.sitioWeb = sitioWeb;
    }

    public Pais getPais() {
        return pais;
    }

    public void setPais(Pais pais) {
        this.pais = pais;
    }

    public Ciudad getCiudad() {
        return ciudad;
    }

    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }

    public BigDecimal getCalificacionProm() {
        return calificacionProm;
    }

    public void setCalificacionProm(BigDecimal calificacionProm) {
        this.calificacionProm = calificacionProm;
    }

    public int getTotalResenas() {
        return totalResenas;
    }

    public void setTotalResenas(int totalResenas) {
        this.totalResenas = totalResenas;
    }

    public boolean isCertificado() {
        return certificado;
    }

    public void setCertificado(boolean certificado) {
        this.certificado = certificado;
    }

    public LocalDateTime getCreadoEn() {
        return creadoEn;
    }

    public void setCreadoEn(LocalDateTime creadoEn) {
        this.creadoEn = creadoEn;
    }

}
