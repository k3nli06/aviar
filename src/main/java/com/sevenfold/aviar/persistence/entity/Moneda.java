package com.sevenfold.aviar.persistence.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Moneda {

    @Id @Column(length = 3)
    private String codigo;
    @Column(length = 100, nullable = false)
    private String nombre;
    @Column(length = 10)
    private String simblo;
    
    public Moneda() {}

    public Moneda(String codigo, String nombre, String simblo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.simblo = simblo;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getSimblo() {
        return simblo;
    }

    public void setSimblo(String simblo) {
        this.simblo = simblo;
    }
    
}
