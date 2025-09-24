package com.sevenfold.aviar.persistence.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Evento {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "area_id", foreignKey = @ForeignKey(foreignKeyDefinition = "area_protegida_id"))
    private AreaProtegida area;
    @ManyToOne
    @JoinColumn(name = "operador_id")
    private Operador operador;
    @Column(length = 100, nullable = false)
    private String tipo;
    @Column(length = 200, nullable = false)
    private String titulo;
    private String descripcion;
    @Column(name = "felcha_inicio", nullable = false)
    private LocalDateTime fechaInicio;
    @Column(name = "felcha_fin", nullable = false)
    private LocalDateTime fechaFin;
    @Column(precision = 12, scale = 2)
    private BigDecimal precio;
    @OneToOne
    @JoinColumn(name = "moneda_codigo")
    private Moneda moneda;
    
    public Evento() {}

    public Evento(Long id, AreaProtegida area, Operador operador, String tipo, String titulo, String descripcion,
            LocalDateTime fechaInicio, LocalDateTime fechaFin, BigDecimal precio, Moneda moneda) {
        this.id = id;
        this.area = area;
        this.operador = operador;
        this.tipo = tipo;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.precio = precio;
        this.moneda = moneda;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AreaProtegida getArea() {
        return area;
    }

    public void setArea(AreaProtegida area) {
        this.area = area;
    }

    public Operador getOperador() {
        return operador;
    }

    public void setOperador(Operador operador) {
        this.operador = operador;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }

}
