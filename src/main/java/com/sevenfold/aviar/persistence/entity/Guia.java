package com.sevenfold.aviar.persistence.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Guia {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "usuario_id", unique = true)
    private Usuario usuario;
    @OneToOne
    @JoinColumn(name = "operador_id")
    private Operador operador;
    private String biografia;
    @Column(name = "anos_exp")
    private int anosExp;
    @Column(name = "calificacion_prom", precision = 3, scale = 2)
    private BigDecimal calificacionProm;
    @Column(name = "total_resenas")
    private int totalResenas;
    private boolean certificacion;
    
    public Guia() {}

    public Guia(Long id, Usuario usuario, Operador operador, String biografia, int anosExp, BigDecimal calificacionProm,
            int totalResenas, boolean certificacion) {
        this.id = id;
        this.usuario = usuario;
        this.operador = operador;
        this.biografia = biografia;
        this.anosExp = anosExp;
        this.calificacionProm = calificacionProm;
        this.totalResenas = totalResenas;
        this.certificacion = certificacion;
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

    public Operador getOperador() {
        return operador;
    }

    public void setOperador(Operador operador) {
        this.operador = operador;
    }

    public String getBiografia() {
        return biografia;
    }

    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }

    public int getAnosExp() {
        return anosExp;
    }

    public void setAnosExp(int anosExp) {
        this.anosExp = anosExp;
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

    public boolean isCertificacion() {
        return certificacion;
    }

    public void setCertificacion(boolean certificacion) {
        this.certificacion = certificacion;
    }

}
