package com.sevenfold.aviar.persistence.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.generator.EventType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Reserva {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "guia_id")
    private Guia guia;
    @ManyToOne
    @JoinColumn(name = "area_id", foreignKey = @ForeignKey(foreignKeyDefinition = "area_protegida_id"))
    private AreaProtegida area;
    @Column(length = 20)
    private String estado;
    @Column(name = "fecha_inicio")
    private LocalDateTime fechaInicio;
    @Column(name = "fecha_fin")
    private LocalDateTime fechaFin;
    private int adultos;
    private int ninos;
    private String notas;
    @Column(precision = 12, scale = 2)
    private BigDecimal total;
    @ManyToOne
    @JoinColumn(name = "moneda_codigo")
    private Moneda moneda;
    @OneToMany(mappedBy = "reserva")
    private List<DetalleReserva> detalleReserva;
    @Column(name = "creado_en")
    @CurrentTimestamp(event = EventType.INSERT)
    private LocalDateTime creadoEn;
    
    public Reserva() {}

    

    public Reserva(Long id, Usuario usuario, Guia guia, AreaProtegida area, String estado,
            LocalDateTime fechaInicio, LocalDateTime fechaFin, int adultos, int ninos, String notas, BigDecimal total,
            Moneda moneda) {
        this.id = id;
        this.usuario = usuario;
        this.guia = guia;
        this.area = area;
        this.estado = estado;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.adultos = adultos;
        this.ninos = ninos;
        this.notas = notas;
        this.total = total;
        this.moneda = moneda;
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

    public Guia getGuia() {
        return guia;
    }

    public void setGuia(Guia guia) {
        this.guia = guia;
    }

    public AreaProtegida getArea() {
        return area;
    }

    public void setArea(AreaProtegida area) {
        this.area = area;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
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

    public int getAdultos() {
        return adultos;
    }

    public void setAdultos(int adultos) {
        this.adultos = adultos;
    }

    public int getNinos() {
        return ninos;
    }

    public void setNinos(int ninos) {
        this.ninos = ninos;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }

    public LocalDateTime getCreadoEn() {
        return creadoEn;
    }

    public void setCreadoEn(LocalDateTime creadoEn) {
        this.creadoEn = creadoEn;
    }



    public List<DetalleReserva> getDetalleReserva() {
        return detalleReserva;
    }

    public void setDetalleReserva(List<DetalleReserva> detalleReserva) {
        this.detalleReserva = detalleReserva;
    }

}
