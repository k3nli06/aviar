package com.sevenfold.aviar.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
public class Foto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Lob 
    private byte[] imagen;    
    private String tipo; 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ave_id", foreignKey = @ForeignKey(foreignKeyDefinition = "especie_ave_id"), nullable = false)
    private EspecieAve ave;

    public Foto() {}

    public Foto(Long id, byte[] imagen, String tipo, EspecieAve ave) {
        this.id = id;
        this.imagen = imagen;
        this.tipo = tipo;
        this.ave = ave;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public EspecieAve getAve() {
        return ave;
    }

    public void setAve(EspecieAve ave) {
        this.ave = ave;
    }

}